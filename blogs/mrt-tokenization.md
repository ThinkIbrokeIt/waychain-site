# Mineral Rights Tokenization (MRT Registry 0x20)

## Environmental Impact Through Economics

Most environmental solutions ask you to stop using resources. We pay claim-holders to leave them in the ground forever.

## How It Works

1. **Prove** - Title deed + GPS hashed to Binary Journal
2. **Verify** - Oracle validates proof, submits attestation
3. **Price** - Oracle pulls spot prices, calculates payout
4. **Escrow** - WAY locked, title NFT to Permanent Reserve
5. **Extinguish** - Immutable certificate. Resource dead forever.

## The MRT Registry (0x20)

Live on-chain at precompile 0x20. Stores:
- Claim boundaries (GPS polygons)
- Mineral types and grades
- Ownership chains
- Extinguishment status

## Economic Model

The calculator uses July 2026 spot prices:
- **Gold**: $4,175/oz (industrial scale claims)
- **Silver**: $62.50/oz
- **Copper**: $4.30/lb
- **Lithium**: $14.50/kg
- **Rare Earth**: $85/kg

For 100 tons of gold at 95% purity:
- Gross value: ~$12M
- Extraction cost: $15,000
- Transport cost: $750
- Net payout: ~$11.9M in 1WAY

## Call to Action

**Developers**: Build apps using MRT data
**Validators**: Host the chain securing real-world assets
**Oracles**: Verified humans verifying offchain data, attesting onchain, earning WAY

[Mineral Rights Calculator](https://waychain.org/#usecases) | [Docs](https://waychain.org/docs)