# Changelog

## v3.0.1 — 2026-06-24
- Added git versioning (was deploying blind via `vercel deploy`)
- Added `version.json` endpoint at https://waychain.org/version.json
- Added `deploy.sh` script for version-bumped deploys
- Added CHANGELOG.md
- Fixed chain ID references: 369 → 10008 (0x2718)

## v3.0.0 — 2026-06-24
- Rewrote whitepaper from 455 lines to 1,469 lines
- Added 12 missing sections: UX Wall, Privacy, Account Model, Oracle Consensus, Cross-Chain, Governance detail, Binary Journal, State Rent, Mineral Rights
- Added honest Status section: 15 live features, 9 spec'd features
- Fixed misleading claims: 1WAY/2WAY marked "Spec'd — Building Phase 6"
- Split precompile section: 5 live vs 8 reserved
- Chain ID changed from 369 (PulseChain) to 10008 (free, digits sum to 9)

## v2.0.0 — 2026-06-23
- All 5 phases complete: tx pipeline, waychain.org, interfaces, WebSocket, hardening
- Dashboard, Explorer, Badge UI deployed
- Cloudflare tunnel for api.waychain.org
- Multi-validator consensus (3 nodes)

## v1.0.0 — 2026-06-20
- Initial design: 19 spec documents, 11,947 lines
- Consensus, EVM, Dox_Dev, Oracle, Tokenomics, Governance specs complete
- Binary Journal integration spec complete
