import createNoise3D from './simplexN3D.mjs';
import createRandom from './Random.mjs';
import Particle from './Particle.mjs';
import $ from './core.js';

const { PI, sin, cos } = Math;
const random = createRandom();
const noise = createNoise3D(random);
const particles = [];
$.init((o) => {}, {
    w: 1200,
    h: 1200,
    color: '#000',
});
$.animate((o) => {
    //
    if ($.frameCount < 200) {
        for (let i = 0; i < 50; i++) {
            const x = random(0, $.w);
            const y = random(0, $.h);
            $.stroke(
                'rgba(255,255,255,0.6)',
                $.map(Math.sin($.frameCount * 0.01), -1, 1, 1, 3),
            );
            $.point(x, y);
            particles.push(new Particle(x, y));
        }
    }
    if ($.frameCount > 200 && $.frameCount < 900) {
        particles.map((p) => {
            p.update(noise);
            //p.applyForce(0, 1);
            p.render((x, y) => {
                const r = $.map(
                    noise(x * 0.003, y * 0.003, 1),
                    -1,
                    1,
                    200,
                    700,
                );
                const dis = $.dist(x, y, $.w / 2, $.h / 2);
                const ns = $.map(dis, 0, r, 0.001, 0.0005);
                p.noise_size_x = ns;
                p.noise_size_y = ns;
                let draw = dis < r;
                let ss = 4;
                if ($.frameCount > 500) {
                    draw = dis > r;
                    ss = 1;
                }
                if (draw) {
                    const ssize = $.map(sin($.frameCount * 0.05), -1, 1, 1, ss);
                    $.stroke('rgba(0,0,0,0.2)', ssize * 0);
                    $.point(x + ssize * 2, y + ssize * 2);
                    $.stroke('#fff', ssize);
                    $.point(x, y);
                }
            });
        });
    }
}, 900);
