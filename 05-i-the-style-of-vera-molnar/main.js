import createNoise3D from '../libs/simplexN3D.mjs';
import createRandom from '../libs/Random.mjs';
import $ from '../libs/core.js';

const { PI, sin } = Math;
const random = createRandom();
const noise = createNoise3D(random);
//

const marg = 200;
$.init(
    (o) => {
        // 1
        // $.stroke('#000');
        // for (let x = marg; x < $.w-marg; x += 10) {
        //     for (let y = marg; y < $.h-marg; y += 40) {
        //         const len = $.map(y, 0, $.h, 5, 30);
        //         const ang = $.map(y, 0, $.h, 0, PI * 2);
        //         $.save();
        //         $.translate(x, y);
        //         $.rotate(ang);
        //         $.line(-len, 0, len, 0);
        //         $.restore();
        //     }
        // }
        // 2
        // for (let x = marg; x < $.w - marg; x += 10) {
        //     for (let y = marg; y < $.h - marg; y += 40) {
        //         const len = $.map(y, 0, $.h, 5, 30);
        //         const ang = random(0, PI * 2);
        //         const sw = $.map(y, 0, $.h, 3, 1);

        //         $.stroke('#000', sw);
        //         $.save();
        //         $.translate(x, y);
        //         $.rotate(ang);
        //         $.line(-len, 0, len, 0);
        //         $.restore();
        //     }
        // }
        // 3
        // for (let x = marg; x < $.w - marg; x += 10) {
        //     for (let y = marg; y < $.h - marg; y += 40) {
        //         const len = $.map(sin(y * 0.01), -1, 1, 5, 20);
        //         const ang = random(0, PI * 2);

        //         $.stroke('#000', 1);
        //         $.save();
        //         $.translate(x, y);
        //         $.rotate(ang);
        //         $.line(-len, 0, len, 0);
        //         $.restore();
        //     }
        // }

        // 4
        $.bg('#000');
        for (let x = marg; x < $.w - marg; x += 50) {
            for (let y = marg; y < $.h - marg; y += 50) {
                const len = $.map(y, 0, $.h, 10, 60);
                const ang = random(0, PI * 2);

                $.noFill();
                $.stroke('#fff', 1);
                $.save();
                $.translate(x, y);
                $.rotate(ang);
                $.rect(-len / 2, -len / 2, len, len);
                $.restore();
            }
        }
    },
    {
        w: 1200,
        h: 1200,
    },
);
//$.animate((o) => {});
