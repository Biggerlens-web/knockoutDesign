import CryptoJS from 'crypto-js'
import {defineNuxtPlugin} from '#app'

// 默认的 DES 密钥和偏移量
const DEFAULT_DES_KEY = 'BdAI49tneLIvk1VIMpWwFZ1Jj2nFnhion2Ul8oIEQ8Liaca72nb16Br4qDNx6T2' // 8字节密钥
const DEFAULT_DES_IV = 'bigger77' // 8字节偏移量

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('crypto', {
        // AES 加密
        encryptAES: (text: string, key: string) => {
            return CryptoJS.AES.encrypt(text, key).toString()
        },
        // AES 解密
        decryptAES: (ciphertext: string, key: string) => {
            const bytes = CryptoJS.AES.decrypt(ciphertext, key)
            return bytes.toString(CryptoJS.enc.Utf8)
        },
        // DES 加密
        encryptDES: (text: string, key: string = DEFAULT_DES_KEY, iv: string = DEFAULT_DES_IV) => {
            const keyHex = CryptoJS.enc.Utf8.parse(key)
            const ivHex = CryptoJS.enc.Utf8.parse(iv)
            const encrypted = CryptoJS.DES.encrypt(text, keyHex, {
                iv: ivHex,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
            return encrypted.toString()
        },
        // DES 解密
        decryptDES: (ciphertext: string, key: string = DEFAULT_DES_KEY, iv: string = DEFAULT_DES_IV) => {
            const keyHex = CryptoJS.enc.Utf8.parse(key)
            const ivHex = CryptoJS.enc.Utf8.parse(iv)
            const decrypted = CryptoJS.DES.decrypt(ciphertext, keyHex, {
                iv: ivHex,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
            return decrypted.toString(CryptoJS.enc.Utf8)
        },
        // MD5 加密
        md5: (text: string) => {
            return CryptoJS.MD5(text).toString()
        },
        // SHA256 加密
        sha256: (text: string) => {
            return CryptoJS.SHA256(text).toString()
        },
        // Base64 编码
        encodeBase64: (text: string) => {
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
        },
        // Base64 解码
        decodeBase64: (text: string) => {
            return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8)
        }
    })
})

declare module '#app' {
    interface NuxtApp {
        $crypto: {
            encryptAES: (text: string, key: string) => string
            decryptAES: (ciphertext: string, key: string) => string
            encryptDES: (text: string, key?: string, iv?: string) => string
            decryptDES: (ciphertext: string, key?: string, iv?: string) => string
            md5: (text: string) => string
            sha256: (text: string) => string
            encodeBase64: (text: string) => string
            decodeBase64: (text: string) => string
        }
    }
}
