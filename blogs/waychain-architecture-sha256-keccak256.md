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

**Developers** (Dox_Dev Level 2):
- Deploy contracts with SHA256 selectors (native)
- 0x21 precompile available for Keccak256 when needed  
- 21 precompiles ready (0x0C-0x25)
- Testnet: https://api.waychain.org/rpc

**Validators** (Dox_Dev Level 2+):
- 200 validator slots available
- 1-second finality, fair rewards
- Treasury distributes 1WAY

**Oracles** (Verified Humans):
- Verify offchain data, attest onchain
- Earn WAY for verified MRT submissions
- OracleAggregator (0x0C) accepts attestations
- Professional geologists, surveyors welcome

[Get your badge at /badge](https://waychain.org/badge) | [Docs for developers](https://waychain.org/docs)