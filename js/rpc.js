// WayChain web RPC — real node connection (issue #10/#11, child of #8).
// Depends on js/precompiles.js (registry) + js/wallet.js (auth), loaded first.
(function (global) {
  'use strict';
  const RPC = global.WayChainWallet ? global.WayChainWallet.RPC_URL : 'https://api.waychain.org';
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
  };
  global.WayChainRPC = api;
})(window);
