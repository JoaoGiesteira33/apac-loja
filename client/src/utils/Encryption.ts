import { useMemo } from "react";

// Function to encrypt data
async function encryptData(data: any, key: CryptoKey): Promise<ArrayBuffer> {
    const encodedData = new TextEncoder().encode(JSON.stringify(data));
    return window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, encodedData);
}

// Function to decrypt data
async function decryptData(encryptedData: ArrayBuffer, key: CryptoKey): Promise<any> {
    const decryptedArray = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, encryptedData);
    const decryptedData = new TextDecoder().decode(decryptedArray);
    return JSON.parse(decryptedData);
}

// Function to generate a key
const Key = useMemo(() => {
    const storedKey = localStorage.getItem('encryptionKey');
    if (storedKey) {
        const keyBuffer = window.atob(storedKey);
        return window.crypto.subtle.importKey('raw', new TextEncoder().encode(keyBuffer), 'AES-GCM', false, ['encrypt', 'decrypt']);
    } else {
        const newKey = window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
        newKey.then((generatedKey) => {
            window.crypto.subtle.exportKey('raw', generatedKey).then((exportedKey) => {
                const exportedKeyString = window.btoa(Array.from(new Uint8Array(exportedKey)).map(byte => String.fromCharCode(byte)).join(''));
                localStorage.setItem('encryptionKey', exportedKeyString);
            });
        });
        return newKey;
    }
}, []);

export { encryptData, decryptData, Key };
