import cryptoJs from 'crypto-js'; // Optional, but we’ll use Web Crypto instead
 
// Use a 32-byte key. Recommended: base64 from your build env (VITE_E2E_AES_KEY)
const base64Key = import.meta.env.VITE_E2E_AES_KEY; // 32-byte key in base64
 
async function importKey() {
  if (!base64Key) throw new Error('Missing VITE_E2E_AES_KEY');
  const raw = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
  if (raw.length !== 32) throw new Error('VITE_E2E_AES_KEY must be 32 bytes (base64)');
  return await crypto.subtle.importKey(
    'raw',
    raw,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}
 
export async function encryptJsonAesGcm(obj) {
  const key = await importKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(obj));
  const ciphertextBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  const ciphertext = btoa(String.fromCharCode(...new Uint8Array(ciphertextBuf)));
  const ivB64 = btoa(String.fromCharCode(...iv));
  // WebCrypto stores the auth tag inside ciphertext (browser AES-GCM does this)
  // Our server expects tag separate, so we’ll split last 16 bytes as tag:
  const ctBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
  const tag = ctBytes.slice(ctBytes.length - 16);
  const body = ctBytes.slice(0, ctBytes.length - 16);
  return {
    ciphertext: btoa(String.fromCharCode(...body)),
    iv: ivB64,
    tag: btoa(String.fromCharCode(...tag)),
  };
}
 
export async function decryptJsonAesGcm({ ciphertext, iv, tag }) {
  const key = await importKey();
  const body = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
  const ivBuf = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  const tagBuf = Uint8Array.from(atob(tag), c => c.charCodeAt(0));
  // Re-attach tag to tail of ciphertext (WebCrypto expects combined)
  const combined = new Uint8Array(body.length + tagBuf.length);
  combined.set(body, 0);
  combined.set(tagBuf, body.length);
  const plaintextBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, combined);
  const text = new TextDecoder().decode(plaintextBuf);
  return JSON.parse(text);
}