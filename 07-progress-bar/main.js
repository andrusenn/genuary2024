import createRandom from '../libs/Random.mjs';
import $ from '../libs/core.js';

const { round, sin, cos } = Math;
const random = createRandom();
//
$.init(
    (o) => {
        $.bg('#000');
        let y = $.h;
        let p = 0;
        let cell = 5;
        $.noStroke();
        let off = 0;
        const si = setInterval(() => {
            //if()
            for (let i = 0; i < $.w; i++) {
                $.fill($.color(random(0, 255)));
                $.rect(
                    $.snap(i, cell),
                    y + sin(off + i * 0.01) * cell * 10,
                    cell,
                    cell,
                );
            }
            off += -0.1;
            if (random(0, 10) > 6) {
                $.fill('#000');
                $.rect(0, $.h / 2 - 100, $.w, 200);
                $.fill('#fff');
                $.cx.font = '100px monospace';
                if (y <= 0) {
                    p = 1;
                    clearInterval(si);
                }
                $.cx.fillText(
                    `${round(p * 100)} %`,
                    $.w / 2 - 80,
                    $.h / 2 + 25,
                );
                $.cx.font = '30px monospace';
                $.cx.fillText(`noisess`, $.w / 2 - 40, $.h / 2 + 80);
                y -= cell;
                p = 1 - y / $.h;
            }
        }, 20);
    },
    {
        w: 1200,
        h: 1200,
    },
);
