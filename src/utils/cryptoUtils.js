import CryptoJS from "crypto-js";

/**
 * Crypto utilities for API data encryption/decryption
 * Compatible with Node.js backend crypto implementation
 */
class CryptoUtils {
  constructor() {
    // Use the same secret key from your environment
    this.secretKey =
      "oYE6BbY5AjZcJXgMtsHlsjYYrQ6Wc7N6fefcwOHBOgCOqypb9CTofLzXVEmhMT2f";
    this.algorithm = "AES";
    this.mode = CryptoJS.mode.CBC;
    this.padding = CryptoJS.pad.Pkcs7;
  }

  /**
   * Generate a random IV for each encryption (16 bytes)
   */
  generateIV() {
    return CryptoJS.lib.WordArray.random(16);
  }

  /**
   * Create a key hash consistent with backend (SHA256)
   */
  getKey() {
    return CryptoJS.SHA256(this.secretKey);
  }

  /**
   * Encrypt data using AES-256-CBC encryption
   * @param {any} data - Data to encrypt (will be JSON stringified)
   * @returns {string} - Base64 encoded encrypted data with IV
   */
  encrypt(data) {
    try {
      const jsonString = JSON.stringify(data);
      const iv = this.generateIV();
      const key = this.getKey();

      console.log("Client encrypting data:", jsonString.substring(0, 100));

      const encrypted = CryptoJS.AES.encrypt(jsonString, key, {
        iv: iv,
        mode: this.mode,
        padding: this.padding,
      });

      // Get the ciphertext as bytes
      const cipherBytes = encrypted.ciphertext;

      // Combine IV (16 bytes) + ciphertext bytes
      const ivBytes = CryptoJS.lib.WordArray.create(iv.words);
      const combined = ivBytes.concat(cipherBytes);

      const result = CryptoJS.enc.Base64.stringify(combined);
      console.log("Client encrypted result length:", result.length);

      return result;
    } catch (error) {
      console.error("Client encryption error:", error);
      throw new Error("Failed to encrypt data");
    }
  }

  /**
   * Decrypt data using AES-256-CBC decryption
   * @param {string} encryptedData - Base64 encoded encrypted data
   * @returns {any} - Decrypted and parsed data
   */
  decrypt(encryptedData) {
    try {
      console.log("Client decrypting data length:", encryptedData.length);
      console.log(
        "Client encrypted data preview:",
        encryptedData.substring(0, 50)
      );

      const key = this.getKey();

      // Convert from Base64 to WordArray
      const combined = CryptoJS.enc.Base64.parse(encryptedData);

      // Extract IV (first 16 bytes = 4 words in CryptoJS)
      const ivWords = combined.words.slice(0, 4);
      const iv = CryptoJS.lib.WordArray.create(ivWords, 16);

      // Extract ciphertext (remaining bytes)
      const ciphertextWords = combined.words.slice(4);
      const ciphertextLength = combined.sigBytes - 16;
      const ciphertext = CryptoJS.lib.WordArray.create(
        ciphertextWords,
        ciphertextLength
      );

      console.log("Client IV:", CryptoJS.enc.Hex.stringify(iv));
      console.log("Client ciphertext length:", ciphertextLength);

      // Create cipher params object
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext,
      });

      // Decrypt
      const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        iv: iv,
        mode: this.mode,
        padding: this.padding,
      });

      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      console.log(
        "Client decrypted string:",
        decryptedString.substring(0, 100)
      );

      if (!decryptedString) {
        throw new Error("Decryption resulted in empty string");
      }

      return JSON.parse(decryptedString);
    } catch (error) {
      console.error("Client decryption error:", error);
      console.error("Failed to decrypt data:", encryptedData.substring(0, 100));
      throw new Error("Failed to decrypt data: " + error.message);
    }
  }

  /**
   * Check if a string is valid JSON
   * @param {string} str - String to check
   * @returns {boolean} - True if valid JSON
   */
  isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if data should be encrypted (based on content type and size)
   * @param {any} data - Data to check
   * @param {string} contentType - Content type of the data
   * @returns {boolean} - True if data should be encrypted
   */
  shouldEncrypt(data, contentType = "application/json") {
    // Don't encrypt if not JSON content type
    if (!contentType.includes("application/json")) {
      return false;
    }

    // Don't encrypt if data is null, undefined, or empty
    if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
      return false;
    }

    // Don't encrypt very large payloads (optional safety check)
    const dataSize = JSON.stringify(data).length;
    if (dataSize > 1024 * 1024) {
      // 1MB limit
      console.warn("Data too large for encryption, skipping");
      return false;
    }

    return true;
  }

  /**
   * Test encryption/decryption compatibility
   * @param {any} testData - Data to test with
   */
  testCompatibility(testData = { test: "data", number: 123 }) {
    try {
      console.log("Testing crypto compatibility...");
      console.log("Original data:", testData);

      const encrypted = this.encrypt(testData);
      console.log("Encrypted:", encrypted);

      const decrypted = this.decrypt(encrypted);
      console.log("Decrypted:", decrypted);

      const isMatch = JSON.stringify(testData) === JSON.stringify(decrypted);
      console.log("Test result:", isMatch ? "✅ PASS" : "❌ FAIL");

      return isMatch;
    } catch (error) {
      console.error("Compatibility test failed:", error);
      return false;
    }
  }
}

// Create and export a singleton instance
const cryptoUtils = new CryptoUtils();

// Run compatibility test on load (only in development)
if (import.meta.env.DEV) {
  cryptoUtils.testCompatibility();
}

export default cryptoUtils;
