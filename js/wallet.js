// WayChain web wallet — REAL Ed25519 auth (issue #10, child of #8).
//
// Mirrors the chain's canonical address scheme (evm/crypto_verify.go
// addrFromPubKey): address = hex(publicKey)[0:40]  (20-byte / 40-hex form).
// This is the SAME scheme mobile wallet.js MUST use (see fix in mobile PR).
// "One voice" — web + mobile derive identical addresses from one mnemonic.
//
// Depends on globals from CDN (same as wallet/index.html):
//   nacl   (tweetnacl)   — ed25519 keygen/sign
//   bip39  (bip39 dist)  — mnemonic <-> seed
// Uses Web Crypto (crypto.subtle.digest) for SHA-256 (available on https).
//
// Load order in HTML: tweetnacl, bip39, then this file, then page script.

(function (global) {
  'use strict';

  const RPC_URL = global.WAYCHAIN_RPC || 'https://api.waychain.org';
  const LS_KEY = 'waychain_account_v1';

  function toHex(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, '0');
    return s;
  }
  function fromHex(h) {
    h = h.replace(/^0x/, '');
    const out = new Uint8Array(h.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(h.substr(i * 2, 2), 16);
    return out;
  }
  const sha256Hex = async (bytes) => {
    const buf = await crypto.subtle.digest('SHA-256', bytes);
    return toHex(new Uint8Array(buf));
  };

  // Derive { mnemonic, privateKey(0x..64hex), publicKey(0x..64hex), address(0x..40hex) }
  async function deriveFromMnemonic(mnemonic) {
    const seed = bip39.mnemonicToSeed(mnemonic.trim(), '');
    const seedBytes = (seed instanceof Uint8Array) ? seed : new Uint8Array(seed);
    const h = await sha256Hex(seedBytes.slice(0, 32).buffer || seedBytes.slice(0, 32));
    const seed32 = fromHex(h).slice(0, 32);
    const kp = nacl.sign.keyPair.fromSeed(seed32);
    const pubHex = toHex(kp.publicKey);
    return {
      mnemonic: mnemonic.trim(),
      privateKey: '0x' + toHex(kp.secretKey),
      publicKey: '0x' + pubHex,
      address: '0x' + pubHex.slice(0, 40), // chain canonical 20-byte form
    };
  }

  async function deriveFromPrivateKey(privateKeyHex) {
    let hex = privateKeyHex.replace(/^0x/, '').trim();
    if (hex.length >= 128) hex = hex.slice(0, 64); // 64-byte secret -> take priv part
    if (hex.length !== 64) throw new Error('Private key must be 32 bytes (64 hex chars)');
    const kp = nacl.sign.keyPair.fromSecretKey(fromHex(hex));
    const pubHex = toHex(kp.publicKey);
    return {
      privateKey: '0x' + toHex(kp.secretKey),
      publicKey: '0x' + pubHex,
      address: '0x' + pubHex.slice(0, 40),
    };
  }

  async function sign(privateKeyHex, messageBytes) {
    const kp = nacl.sign.keyPair.fromSecretKey(fromHex(privateKeyHex.replace(/^0x/, '')));
    return '0x' + toHex(nacl.sign.detached(messageBytes, kp.secretKey));
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); }
    catch { return null; }
  }
  function save(acc) { localStorage.setItem(LS_KEY, JSON.stringify(acc)); localStorage.setItem('waychain_a', acc.address); }
  function clear() { localStorage.removeItem(LS_KEY); }

  async function connect(buttonId) {
    let acc = load();
    if (!acc) {
      // No stored account: generate a fresh one (user can re-import via wallet page).
      const mnemonic = bip39.generateMnemonic ? bip39.generateMnemonic()
        : bip39.entropyToMnemonic(toHex(crypto.getRandomValues(new Uint8Array(16))));
      acc = await deriveFromMnemonic(mnemonic);
      acc.mnemonic = mnemonic;
      acc.backedUp = false;
      save(acc);
    }
    global.waychainAccount = acc;
    const btn = buttonId ? document.getElementById(buttonId) : null;
    if (btn) {
      btn.textContent = acc.address.slice(0, 10) + '…' + acc.address.slice(-6) + ' ✓';
      btn.style.borderColor = 'var(--green, #2ecc71)';
      btn.style.color = 'var(--green, #2ecc71)';
    }
    document.dispatchEvent(new CustomEvent('waychain:connected', { detail: acc }));
    return acc;
  }

  global.WayChainWallet = {
    RPC_URL, deriveFromMnemonic, deriveFromPrivateKey, sign,
    load, save, clear, connect, toHex, fromHex, sha256Hex,
  };
})(window);
