// Random function w/ seed
/*
// seeding -> cyrb128 + mulberry32
let random = _createRandom(seed?);
// Use
random() -> 0 to < 1
random(5,15) -> 5 to < 15
*/
function _createRandom(seed = '') {
    let cyrb128 = (str) => {
        let h1 = 1779033703,
            h2 = 3144134277,
            h3 = 1013904242,
            h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        return [
            (h1 ^ h2 ^ h3 ^ h4) >>> 0,
            (h2 ^ h1) >>> 0,
            (h3 ^ h1) >>> 0,
            (h4 ^ h1) >>> 0,
        ];
    };
    let mulberry32 = (a) => {
        return function () {
            var t = (a += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    };
    // w/seed
    if (seed !== '') {
        const r = mulberry32(cyrb128(seed)[0]);
        return r;
    }
    // just random
    if (seed === '') {
        return Math.random;
    }
    return 0;
}
export default function createRandom(seed = '') {
    let r = _createRandom(seed);
    return function (a, b) {
        if (arguments.length == 0) {
            return r();
        }
        return r() * (b - a) + a;
    };
}
