
import CryptoJS from "crypto-js";

function _noise(a, b) {
    let c = a * b;
    for (let i = 0; i < 5; i++) {
        c = (c >> 1) ^ (b + i);
    }
    return c > 100 ? c - 10 : c + 10;
}


const _data = {
    _a: [40 + 8, 110 - 3, 100 + 11, 100 - 2, 48 + 1],
    _b: "b29IJC0=",
    _c: "bf<tv",
    _d: {
        data: ['H', 'k', '/', 'e', 'Z'],
        key: 25
    },
    _e: [95, 40, 54, 35, 104],
    _f: [100, 50, 80, 60, 90, 3]
};
var __p1 = _noise(Date.now(), 31);

const __p4 = _data._c.split('').reverse().join('');

var __p1 = _data._a.map(c => String.fromCharCode(c)).join('');

const __p6 = String.fromCharCode(_data._f[4]) +
    String.fromCharCode(_data._f[3] + 8) +
    String.fromCharCode(_data._f[1] + 2) +
    String.fromCharCode(_data._f[0] + _data._f[5]) +
    String.fromCharCode(_data._f[2] + _data._f[5]);


const __p3 = (typeof atob !== 'undefined') ?
    atob(_data._b) :
    String.fromCharCode(111, 111, 72, 36, 45);

const __p5 = _data._d.data.map(c => {
    let code = c.charCodeAt(0);
    return String.fromCharCode(code ^ _data._d.key);
}).join('');
let __p2_arr = [];
for (let i = _data._e.length - 1; i >= 0; i--) {
    __p2_arr.unshift(String.fromCharCode(_data._e[i]));
}
const __p2 = __p2_arr.join('');

export  default function b() {
    const timestamp = Date.now();
    const nonce = CryptoJS.lib.WordArray.random(8).toString();
    const message = `CKASHRAF:${timestamp}:--PS${nonce}`;
    const hash = 
    CryptoJS.HmacSHA256(message, __p1 + __p2 + __p3 + __p4 + __p5 + __p6).toString(CryptoJS.enc.Hex);

    return { hash, timestamp, nonce };
}

// // On Client
// const payload = "user123";
// const { hash, timestamp, nonce } = b();

// Send to Server:
// { payload, hash, timestamp, nonce }

// On Server:
// function verifyHash(payload, timestamp, nonce, hash) {
//     const message = `CKASHRAF:${timestamp}:--PS${nonce}`;
//     const checkHash = crypto
//         .createHmac("sha256", SECRET)
//         .update(message)
//         .digest("hex");
//     return hash === checkHash;
// }
