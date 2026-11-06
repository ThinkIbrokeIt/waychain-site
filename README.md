# WayChain Site

The **live web front-end for WayChain** — faucet, wallet, explorer, dex, gauntlet,
protocol docs, and more. This is the repo Vercel deploys to **waychain.org**.
It is **not** a mirror; it is the active site codebase.

WayChain is a custom L1 (ed25519 accounts, 27 precompiles, native WAY token).
The chain node lives in the monorepo [`ThinkIbrokeIt/waychain`](https://github.com/ThinkIbrokeIt/waychain).
This repo is the web layer that talks to it.

## Quick start (local)

```bash
# 1. Serve the site
python3 -m http.server 8090 --bind 127.0.0.1
# open http://127.0.0.1:8090/

# 2. Point the site at a live node. By default pages call https://api.waychain.org.
#    For local testing, run the WayChain node on :9545 and a cloudflared tunnel:
#    cloudflared tunnel run waychain-rpc   # maps api.waychain.org -> localhost:9545
```

See **[DEV-ONBOARDING.md](./DEV-ONBOARDING.md)** for the full path from zero to
"funded a wallet on the local node," and the monorepo
[LOCAL-TESTING.md](https://github.com/ThinkIbrokeIt/waychain/blob/main/LOCAL-TESTING.md)
for node + tunnel setup.

## Layout
- `wallet/`, `faucet/`, `explorer/`, `dex/`, `gauntlet/`, `protocol/` — feature pages
- `js/` — `rpc.js` (node connection), `wallet.js` (ed25519 auth), `precompiles.js` (registry)
- `vercel.json` — rewrites + security headers

## Branch policy
`master` is the production branch (Vercel). All active work happens here — open PRs against `master`.

## Need help?
We're actively looking for devs and protocol engineers to stress-test the chain.
See DEV-ONBOARDING.md and open an issue or PR.
