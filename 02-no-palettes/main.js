import createNoise3D from './simplexN3D.mjs';
import createRandom from './Random.mjs';
import $ from './core.js';

const { PI, sin, cos } = Math;
const random = createRandom();
const noise = createNoise3D(random);
let X = 0;
let Y = 0;
let CELL = 5;
let ANG = 0;
$.init(
    (o) => {
        ANG = random(0, PI / 2);
    },
    {
        w: 1200,
        h: 1200,
        color: '#000',
    },
);
$.animate((o) => {
    for (let i = 0; i < 50; i++) {
        const n = noise(X * 0.001, Y * 0.001, Y * 0.001);
        const len = $.map(n, -1, 1, 5, 300);
        let cr = $.map(n, -1, 1, 2, 50);
        let ss = 1;
        const a1 = X * 0.05 * n;
        let a2 = Y * 0.005 * n;
        let a = PI * 2 * n;
        if (X > $.w / 2) {
            a = $.snap(PI * n, PI / 4);
            a2 = $.snap(Y * 0.005 * n, PI / 4);
            cr = $.map(n, -1, 1, 1, 5);
            ss = 3;
        }
        const r = $.map(cos(a1 + ANG) * sin(a2 + ANG), -1, 1, 0, 255);
        const g = $.map(sin(a1 + ANG) * sin(a2 + ANG), -1, 1, 0, 255);
        const b = $.map(cos(a1 + ANG), -1, 1, 0, 255);
        const dis = $.dist(X, Y, $.w / 2, $.h / 2);
        if (dis < 600) {
            $.cx.save();
            $.translate(X, Y);
            $.rotate(a);
            $.stroke(`rgba(0,0,0,0.8)`, ss);
            $.line(4, 0, 4, len);
            $.stroke(`rgb(${r},${g},${b})`, ss);
            $.line(0, 0, 0, len);
            $.stroke(`rgb(${b},${r},${g})`, 0.5);
            $.circle(0, len, cr);
            $.cx.restore();
        }
        if (X >= $.w) {
            X = 0;
            Y += CELL;
            if (Y >= $.h) {
                Y = 0;
            }
        } else {
            X += CELL;
        }
    }
});
