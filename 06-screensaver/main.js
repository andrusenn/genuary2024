import createNoise3D from '../libs/simplexN3D.mjs';
import createRandom from '../libs/Random.mjs';
import $ from '../libs/core.js';

const { PI, sin, cos } = Math;
const random = createRandom();
const noise = createNoise3D(random);
//
$.init(
    (o) => {
        $.bg('#000');
    },
    {
        w: 1200,
        h: 1200,
    },
);
let offz = 0;
$.animate(() => {
    // $.fill($.color(0, 0, 0, 10));
    // $.rect(0, 0, $.w, $.h);
    $.stroke($.color(0), 1);
    $.line(0, 0, $.w, 0);
    // $.fill('#fff');
    // $.rect(random(0, $.w), 0, 4, 4);

    $.stroke($.color(255, 80), 2);
    circle($.w / 2, $.h * 0.3, offz, 20, sin(offz) * 200);

    $.save();
    const image = $.getImage(0, 0);
    $.image(image, 0, 1);
    $.restore();
    offz += 0.003;
});
let offx = 0;
let offy = 0;
function circle(x, y, offz, a, b) {
    const num = 400;
    const ang = (PI * 2) / num;
    for (let i = 0; i < num; i++) {
        const r = $.map(noise(offx, offy, offz), -1, 1, a, b);
        const ax = x + cos(ang * i) * r;
        const ay = y + sin(ang * i) * r;
        $.point(ax, ay);
        offx = cos(ang * i) * 1;
        offy = sin(ang * i) * 1;
    }
}
