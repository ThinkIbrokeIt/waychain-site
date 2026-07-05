# WayChain Architecture: SHA256 + Keccak256

## Why WayChain Chose SHA256

Most blockchains use Keccak256 for function selectors and hashing. WayChain chose SHA256 for three reasons:

1. **Bitcoin Compatibility** - SHA256 is the cryptographic primitive of Bitcoin, the most secure blockchain
2. **Tooling Maturity** - Every developer knows SHA256, every cloud provider supports it
3. **Auditable Consensus** - SHA256 is simpler, faster, and more auditable than Keccak256

## The 0x21 Precompile Bridge

While SHA256 is native, we recognize developers need EVM compatibility. Precompile `0x21` provides Keccak256 for app-layer choice.

```javascript
// Native WayChain: SHA256 selectors
const hash = sha256(data);

// EVM compatibility via 0x21 precompile
const keccak = waychain.call('0x21', 'keccak256', data);
```

This gives you:
- **Native security** with SHA256 consensus
- **EVM compatibility** when needed via 0x21
- **No forced compromise** — you choose

## Call to Action

**Oracles** (Professional geologists, Level 2):
- Verify offchain mineral data, attest onchain
- Earn WAY for MRT submissions
- OracleAggregator (0x0C) accepts data

**Validators** (Level 2+):
- 200 validator slots available
- Earn WAY from treasury
- Swap to 1WAY via DEX for stable value

**Curators** (Level 3, 90-day terms):
- Appointed from Level 3 badge holders
- Earn WAY for protocol governance
- Curate attestations, approve validators

**Influencers** (Professional communicators):
- Verified accounts via /badge
- Community growth rewards in 1WAY (via DEX swap)

**Developers** (Level 2):
- Deploy contracts with SHA256 selectors
- Swap WAY → 1WAY via DEX

[Get your badge at /badge](https://waychain.org/badge) | [Docs for developers](https://waychain.org/docs)