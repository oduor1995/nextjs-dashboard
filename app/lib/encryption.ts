
export default class AesUtil {
    async encrypt(secretKey: string, plainMessage: string): Promise<string> {
      const salt = crypto.getRandomValues(new Uint8Array(16)); // Random salt of 16 bytes
      const secret = await this.getSecretKey(secretKey, salt);
      const iv = crypto.getRandomValues(new Uint8Array(12)); // Random IV of 12 bytes
      const cipher = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        secret,
        new TextEncoder().encode(plainMessage),
      );
      const encryptedMessageByte = new Uint8Array(cipher);
      const tag = encryptedMessageByte.slice(-16);
      const cipherByte = new Uint8Array([
        ...iv,
        ...salt,
        ...encryptedMessageByte.slice(0, -16),
        ...tag,
      ]);
      return btoa(String.fromCharCode(...cipherByte));
    }
    async decrypt(secretKey: string, cipherMessage: string): Promise<string> {
      const decodedCipherByte = new Uint8Array(
        [...atob(cipherMessage)].map((char) => char.charCodeAt(0)),
      );
      const iv = decodedCipherByte.slice(0, 12);
      const salt = decodedCipherByte.slice(12, 28);
      const tag = decodedCipherByte.slice(-16);
      const encryptedMessageByte = decodedCipherByte.slice(28, -16);
      const secret = await this.getSecretKey(secretKey, salt);
      try {
        const decryptedMessageByte = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv: iv },
          secret,
          new Uint8Array([...encryptedMessageByte, ...tag]),
        );
        return new TextDecoder().decode(decryptedMessageByte);
      } catch (error) {
        console.error("Decryption Error:", error);
        throw error;
      }
    }
    private async getSecretKey(
      password: string,
      salt: Uint8Array,
    ): Promise<CryptoKey> {
      const passwordBuffer = new TextEncoder().encode(password);
      const importedKey = await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits"],
      );
      const keyMaterial = await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 65536,
          hash: "SHA-256",
        },
        importedKey,
        256, // Ensure 256-bit key length for AES-GCM
      );
      return await crypto.subtle.importKey(
        "raw",
        keyMaterial,
        { name: "AES-GCM" },
        true, // Make sure to set extractable to true
        ["encrypt", "decrypt"],
      );
    }
  }