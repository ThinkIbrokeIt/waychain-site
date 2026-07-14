// WayChain web RPC — real node connection (issue #10/#11, child of #8).
// Depends on js/precompiles.js (registry) + js/wallet.js (auth), loaded first.
(function (global) {
  'use strict';
  const RPC = global.WayChainWallet ? global.WayChainWallet.RPC_URL : 'https://api.waychain.org';
  const REGISTRY = global.WayChainPrecompiles || (global.PRECOMPILES);
  const call = async (method, params) => {
    const res = await fetch(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error.message || JSON.stringify(json.error));
    return json.result ?? null;
  };
  const hexToNum = (hex) => {
    if (!hex || hex === '0x' || hex === '0x0') return 0;
    try { return Number(BigInt('0x' + hex.replace(/^0x/, ''))); } catch { return 0; }
  };
  const api = {
    call,
    getBalance: (address) => call('way_getBalance', [address]),
    getBlockCount: () => call('way_getBlockCount', []),
    getGovernanceProposals: async () => { const r = await call('way_govProposals', []); return Array.isArray(r) ? r : []; },
    getTwoWayStats: async () => {
      const r = await call('way_twoWayStats', []);
      if (!r || typeof r !== 'object') throw new Error('no twoWayStats');
      return { vaults: hexToNum(r.vaults), totalDebt: hexToNum(r.totalDebt) };
    },
    getBridgeStats: async () => {
      const r = await call('way_bridgeStats', []);
      if (!r || typeof r !== 'object') throw new Error('no bridgeStats');
      return { committed: hexToNum(r.committed), withdrawn: hexToNum(r.withdrawn) };
    },

    // ── Per-precompile call layer (issue #11) ──
    // READ for all 27 precompiles via eth_call + the shared registry.
    // WRITE from web requires a tx-signing pipeline (port of mobile tx.js) —
    // NOT yet available on web; throws a clear error so the gap is visible.
    precompileCall: async (addr1, method, argsHex = '', opts = {}) => {
      const reg = (global.WayChainPrecompiles && global.WayChainPrecompiles.PRECOMPILES) || null;
      if (!reg) throw new Error('precompile registry not loaded');
      const pc = reg[addr1];
      if (!pc) throw new Error(`Unknown precompile ${addr1}`);
      const m = pc.methods.find((x) => x.name === method);
      if (!m) throw new Error(`Unknown method ${method} on ${pc.name}`);
      // address = 0x0..0 + 2-hex index (matches chain precompile address form)
      const to = '0x' + '0'.repeat(24) + addr1.replace(/^0x/, '').toLowerCase();
      const data = global.WayChainPrecompiles.encodeCall(addr1, method, argsHex);
      if (m.kind === 'read' && !opts.write) {
        return call('eth_call', [{ to, data }]);
      }
      throw new Error('Web write path not implemented yet (needs tx.js signer port). Tracked in #11/#12.');
    },
  };
  global.WayChainRPC = api;
})(window);
