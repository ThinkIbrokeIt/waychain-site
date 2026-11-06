# Dev Onboarding — WayChain Site

Goal: in ~5 commands, go from a clean clone to **funding a wallet on a running
WayChain node** and using the web wallet against it. This is the path we hand to
devs/protocol engineers who want to stress-test what we've built.

## Prerequisites
- A running WayChain node on `localhost:9545` (chain ID `10008`).
  (Build + run from the monorepo `ThinkIbrokeIt/waychain`.)
- `cloudflared` installed (tunnel the node to the public RPC host).
- `python3` (to serve the site locally).

## Steps

### 1. Clone + serve the site
```bash
git clone https://github.com/ThinkIbrokeIt/waychain-site.git
cd waychain-site
python3 -m http.server 8090 --bind 127.0.0.1
# open http://127.0.0.1:8090/
```

### 2. Confirm the node is up
```bash
curl -s -X POST http://localhost:9545 -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}'
# → {"result":"0x2718"}
```

### 3. Tunnel the node to the public RPC host
The site calls `https://api.waychain.org`. Map that to your local node:
```bash
cloudflared tunnel run waychain-rpc
# config: api.waychain.org -> http://localhost:9545
```
Verify:
```bash
curl -s -X POST https://api.waychain.org -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}'
# → {"result":"0x2718"}   (was Cloudflare 1033 while AWS was down)
```

### 4. Fund a test wallet (faucet)
The faucet calls `way_fundGenesis([address, amount])`:
```bash
curl -s -X POST https://api.waychain.org -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"way_fundGenesis","params":["0xYOURADDR","0xa"]}'
# → {"result":"0xa"}   (10 WAY sent)
```
Then check the balance:
```bash
curl -s -X POST https://api.waychain.org -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_getBalance","params":["0xYOURADDR","latest"]}'
# → {"result":"0xa"}
```
Or just use the UI: open `http://127.0.0.1:8090/faucet`, paste an address, click
**Request 10 WAY**.

### 5. Create a web wallet + send
Open `http://127.0.0.1:8090/wallet` → **Create New Wallet**. It derives an
ed25519 keypair, shows a 20-byte address + recovery phrase. Use **Get Test WAY**
(faucet) then **Send WAY** to another address.

## What to stress-test (scoped asks)
- **Faucet load** — hammer `way_fundGenesis`, watch for nonce/race issues.
- **Precompiles** — 27 live precompiles (0x0C–0x26). Call them via `eth_call`.
- **Tx pipeline** — sign + broadcast via the web wallet; verify on `/explorer`.
- **Balance model** — node keys accounts by 20-byte address (not 64-hex pubkey).

## Gotchas (known drift we've fixed)
- Wallet page BIP39 loads from `@scure/bip39@1.2.2/+esm`. The old
  `bip39@3.0.12/dist/index.browser.min.js` UMD was removed in v3 and 404s.
- Anonymous Vercel deploys get bot-blocked (403). Use authenticated `vercel login`
  for real deploys, or just serve locally (step 1).
- Balance check races the async fund — re-query a moment later if you see 0x0.

## Where things live
- Node / consensus: `ThinkIbrokeIt/waychain` (monorepo)
- Web site (this repo): `ThinkIbrokeIt/waychain-site`
- Local-testing setup: monorepo `LOCAL-TESTING.md`
