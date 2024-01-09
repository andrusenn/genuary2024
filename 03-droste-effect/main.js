import createNoise3D from '../libs/simplexN3D.mjs';
import createRandom from '../libs/Random.mjs';
import $ from '../libs/core.js';

const { PI, round } = Math;
const random = createRandom();
const noise = createNoise3D(random);
//
let fspiral = [],
    scale = 0.06,
    initScale = scale,
    scaleMult = 0.991;
$.init(
    (o) => {
        $.smooth(false);
        fspiral = [1, 2];
        for (let i = 0; i < 20; i++) {
            fspiral.push(
                fspiral[fspiral.length - 2] + fspiral[fspiral.length - 1],
            );
        }
    },
    {
        w: 800,
        h: 800,
    },
);
$.animate((o) => {
    $.bg('#ccc');
    $.save();
    $.translate($.w / 2, $.h / 2);
    $.stroke('#000');
    $.noFill();
    for (let i = 0; i < fspiral.length; i++) {
        let w = fspiral[i] * scale;
        $.rect(0, 0, w, w);
        //if (i % 2 === 0) {
        $.save();
        const cell = w * 0.1;
        for (let xx = 0; xx < w; xx += cell) {
            for (let yy = 0; yy < w; yy += cell) {
                const n = noise(xx * 0.01, yy * 0.01, 1);
                let bw = round($.map(n, -1, 1, 0, 1)) * 255;
                $.fill(`rgb(${bw},${bw},${bw})`);
                $.rect(xx, yy, cell, cell);
            }
        }
        $.restore();
        $.translate(w, w);
        $.rotate(PI / 2);
    }
    $.restore();
    if (
        scale >
        (fspiral[fspiral.length - 1] / fspiral[fspiral.length - 5]) * initScale
    ) {
        // reset
        scale = initScale;
    }
    // Change scale
    scale /= scaleMult;
});
