// Minimal ABI arg encoder for WayChain precompile calls (issue #12.2).
// The registry's encodeCall appends raw argsHex, so callers must pre-encode
// args. These helpers produce the 32-byte-left-padded Solidity encodings the
// precompiles expect (address, uint256). EVM word = 32 bytes.
(function (global) {
  'use strict';

  function pad32(hex) {
    const h = hex.replace(/^0x/, '');
    return h.padStart(64, '0');
  }

  // Encode an address arg (20-byte) as a 32-byte left-padded word.
  function encodeAddress(addr) {
    const a = addr.replace(/^0x/, '').toLowerCase().padStart(40, '0');
    return pad32(a);
  }

  // Encode a uint256 arg as a 32-byte big-endian word.
  function encodeUint256(value) {
    let v;
    try { v = BigInt(value); } catch { v = 0n; }
    let hex = (v < 0n ? (1n << 256n) + v : v).toString(16);
    return pad32(hex);
  }

  // Concatenate already-encoded 32-byte words.
  function concat(...words) {
    return '0x' + words.map((w) => w.replace(/^0x/, '')).join('');
  }

  global.WayChainABI = { encodeAddress, encodeUint256, pad32, concat };
})(window);
