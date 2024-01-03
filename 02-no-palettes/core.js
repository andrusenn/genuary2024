const win = document.defaultView ?? window;
// Animation frame ----------------------------------------------
win.requestAnimationFrame =
    win.requestAnimationFrame ||
    win.mozRequestAnimationFrame ||
    win.webkitRequestAnimationFrame ||
    win.msRequestAnimationFrame;

win.cancelAnimationFrame =
    win.cancelAnimationFrame || win.mozCancelAnimationFrame;
// ---------------------------------------------------------------
// OBJ
const A2D = {
    frameCount: 1,
    animationID: null,
    cx: null,
    w: null,
    h: null,
    // INIT
    init: function (cb, optCanvas = {}) {
        const opts = {
            w: window.innerWidth,
            h: window.innerHeight,
            color: '#000',
            rf: true,
            ...optCanvas,
        };
        // Create canvas
        const cv = document.createElement('canvas');
        cv.width = opts.w;
        cv.height = opts.h;
        document.body.appendChild(cv);
        this.w = cv.width;
        this.h = cv.height;
        // Context
        this.cx = cv.getContext('2d', { willReadFrequently: opts.rf });
        this.cx.fillStyle = opts.color;
        // Fill background
        this.cx.fillRect(0, 0, opts.w, opts.h);
        this.cx.fill();
        // Callback
        cb({ cx: this.cx });
    },

    // ANIMATE
    animate: function (cb, times = Infinity) {
        if (this.frameCount < times) {
            this.animationID = win.requestAnimationFrame(() => {
                if (cb) {
                    cb({ cx: this.cx });
                }
                this.animate(cb, times);
                this.frameCount++;
            });
        } else {
            win.cancelAnimationFrame(this.animationID);
        }
    },
    bg: function (c) {
        this.cx.fillStyle = c;
        // Fill background
        this.cx.fillRect(0, 0, this.w, this.h);
        this.cx.fill();
    },
    line: function (x1, y1, x2, y2) {
        this.cx.beginPath();
        this.cx.moveTo(x1, y1);
        this.cx.lineTo(x2, y2);
        this.cx.stroke();
    },
    stroke: function (col = '#fff', lw = 1) {
        col = col ?? '#fff';
        this.cx.strokeStyle = col;
        this.cx.lineWidth = lw;
    },
    point: function (x1, y1) {
        this.cx.beginPath();
        this.cx.moveTo(x1, y1);
        this.cx.lineCap = 'round';
        this.cx.lineTo(x1, y1);
        this.cx.stroke();
    },
    dist: function (x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    },
    circle: function (x, y, d) {
        this.cx.beginPath();
        this.cx.arc(x, y, d, 0, 2 * Math.PI, true);
        this.cx.closePath();
        this.cx.stroke();
    },
    shadow: function (x = 0, y = 0, b = 10, c = '#000') {
        this.cx.shadowColor = c;
        this.cx.shadowOffsetX = x;
        this.cx.shadowOffsetY = y;
        this.cx.shadowBlur = b;
    },
    noShadow: function () {
        this.cx.shadowColor = 'rgba(0,0,0,0)';
        this.cx.shadowOffsetX = 0;
        this.cx.shadowOffsetY = 0;
        this.cx.shadowBlur = 0;
    },
    map: function (v, a1, b1, a2, b2) {
        return a2 + ((b2 - a2) * (v - a1)) / (b1 - a1);
    },
    snap: function (v, s) {
        return Math.floor(v / s) * s;
    },
    getImage: function (x, y, w, h) {
        return this.cx.getImageData(x, y, w, h);
    },
    image: function (i, x, y) {
        this.cx.putImageData(i, x, y);
    },
    scale: function (x, y) {
        this.cx.scale(x, y);
    },
    rotate: function (g) {
        this.cx.rotate(g);
    },
    translate: function (x, y) {
        this.cx.translate(x, y);
    },
};
export default A2D;
//
// function _keyDown() {
//     try {
//         if (typeof onKeyDown === 'function') {
//             window.addEventListener('keydown', (evt) => {
//                 key = evt.key;
//                 onKeyDown(evt);
//             });
//         }
//     } catch (e) {
//         console.error(e);
//     }
// }
// function _keyUp() {
//     try {
//         if (typeof onKeyUp === 'function') {
//             window.addEventListener('keyup', (evt) => {
//                 key = evt.key;
//                 onKeyUp(evt);
//             });
//         }
//     } catch (e) {
//         console.error(e);
//     }
// }
