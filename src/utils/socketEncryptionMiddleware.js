// utils/socketEncryptionMiddleware.js

import CryptoJS from "crypto-js";
import { isBuffer } from "lodash";

class UniversalSocketEncryption {
  constructor(secretKey = "SSHN1MKXPOpdDtKW2jzwfN9Adhn7er3U") {
    // Derive a 32-byte key via SHA-256 (matches backend)
    this.key = CryptoJS.SHA256(String(secretKey));
    this.algorithm = "AES-256-CBC";
  }

  // Generate random 16-byte IV per message
  generateIV() {
    return CryptoJS.lib.WordArray.random(16);
  }

  encrypt(data) {
    try {
      const text =
        typeof data === "object" ? JSON.stringify(data) : String(data);
      const iv = this.generateIV();

      // CryptoJS returns base64 string by default when calling toString() on ciphertext
      const encrypted = CryptoJS.AES.encrypt(text, this.key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return {
        __encrypted: true,
        data: encrypted.toString(), // base64 ciphertext
        iv: CryptoJS.enc.Base64.stringify(iv), // base64 IV (matches backend)
        encoding: "base64",
        alg: this.algorithm,
      };
    } catch (error) {
      console.error("Encryption error:", error);
      return data;
    }
  }

  decrypt(encryptedData) {
    try {
      if (!encryptedData || !encryptedData.__encrypted) {
        return encryptedData;
      }

      const { data: encrypted, iv, encoding = "base64" } = encryptedData;
      if (!encrypted || !iv) return encryptedData;

      // IV is base64 per our encrypt(); convert to WordArray
      const ivWordArray = CryptoJS.enc.Base64.parse(iv);

      // CryptoJS expects base64 by default; handle hex if ever sent
      const cipherText =
        encoding === "hex" ? CryptoJS.enc.Hex.parse(encrypted) : encrypted;

      const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) return encryptedData;

      try {
        return JSON.parse(decryptedText);
      } catch {
        return decryptedText;
      }
    } catch (error) {
      console.error("Decryption error:", error);
      return encryptedData;
    }
  }

  wrapSocket(socket) {
    const originalEmit = socket.emit;
    const originalOn = socket.on;
    const originalOff = socket.off;

    socket.emit = (event, data, ...args) => {
      if (
        data &&
        typeof data === "object" &&
        !isBuffer(data) &&
        !data.__encrypted
      ) {
        data = this.encrypt(data);
      }
      return originalEmit.call(socket, event, data, ...args);
    };

    const wrappedListeners = new Map();

    socket.on = (event, listener) => {
      const wrappedListener = (data, ...args) => {
        if (data && data.__encrypted) {
          data = this.decrypt(data);
        }
        return listener(data, ...args);
      };
      wrappedListeners.set(listener, wrappedListener);
      return originalOn.call(socket, event, wrappedListener);
    };

    socket.off = (event, listener) => {
      if (listener && wrappedListeners.has(listener)) {
        const wrappedListener = wrappedListeners.get(listener);
        wrappedListeners.delete(listener);
        return originalOff.call(socket, event, wrappedListener);
      }
      return originalOff.call(socket, event, listener);
    };

    return socket;
  }
}

export const universalSocketEncryption = new UniversalSocketEncryption();
export const wrapSocketWithEncryption = (socket) =>
  universalSocketEncryption.wrapSocket(socket);
export default universalSocketEncryption;
