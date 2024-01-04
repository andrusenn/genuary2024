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
    _isFill: true,
    _isStroke: true,
    // INIT
    init: function (cb, optCanvas = {}) {
        const opts = {
            w: window.innerWidth,
            h: window.innerHeight,
            color: '#000',
            id: 'ad2Canvas',
            rf: true,
            ...optCanvas,
        };
        // Create canvas
        const cv = document.createElement('canvas');
        cv.id = opts.id;
        cv.width = opts.w;
        cv.height = opts.h;
        document.body.appendChild(cv);
        this.w = cv.width;
        this.h = cv.height;
        // Context
        this.cx = cv.getContext('2d', { willReadFrequently: opts.rf });
        //this.cx.fillStyle = opts.color;
        // Fill background
        cv.style.backgroundColor = opts.color;
        //this.cx.fillRect(0, 0, opts.w, opts.h);
        //this.cx.fill();
        // Defaults
        this.cx.fillStyle = '#fff';
        this.cx.strokeStyle = '#000';
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
    stroke: function (col = '#000', lw = 1) {
        this.isStroke = true;
        col = col ?? '#000';
        this.cx.strokeStyle = col;
        this.cx.lineWidth = lw;
    },
    noStroke: function () {
        this.isStroke = false;
    },
    fill: function (col = '#fff') {
        this._isFill = true;
        col = col ?? '#fff';
        this.cx.fillStyle = col;
    },
    noFill: function () {
        this._isFill = false;
    },
    // Figures
    bg: function (c) {
        this.cx.save();
        this.cx.clearRect(0, 0, this.w, this.h);
        this.cx.fillStyle = c;
        // Fill background
        this.cx.fillRect(0, 0, this.w, this.h);
        this.cx.fill();
        this.cx.restore();
    },
    line: function (x1, y1, x2, y2) {
        this.cx.beginPath();
        this.cx.moveTo(x1, y1);
        this.cx.lineTo(x2, y2);
        this.cx.stroke();
    },
    point: function (x1, y1) {
        this.cx.beginPath();
        this.cx.moveTo(x1, y1);
        this.cx.lineCap = 'round';
        this.cx.lineTo(x1, y1);
        this.cx.stroke();
    },
    circle: function (x, y, r) {
        this.cx.beginPath();
        this.cx.arc(x, y, Math.abs(r), 0, 2 * Math.PI, true);
        this.cx.closePath();
        if (this._isFill) this.cx.fill();
        if (this._isStroke) this.cx.stroke();
    },
    arc: function (x, y, r, a1, a2, ah = true) {
        this.cx.beginPath();
        this.cx.arc(x, y, Math.abs(r), a1, a2, ah);
        if (this._isFill) this.cx.fill();
        if (this._isStroke) this.cx.stroke();
    },
    rect: function (x, y, w, h) {
        this.cx.beginPath();
        this.cx.rect(x, y, w, h);
        if (this._isFill) this.cx.fill();
        if (this._isStroke) this.cx.stroke();
    },
    // Effects
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
    // Calc
    dist: function (x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    },
    map: function (v, a1, b1, a2, b2) {
        return a2 + ((b2 - a2) * (v - a1)) / (b1 - a1);
    },
    snap: function (v, s) {
        return Math.floor(v / s) * s;
    },
    // Image
    getImage: function (x, y, w, h) {
        return this.cx.getImageData(x, y, w, h);
    },
    image: function (i, x, y) {
        this.cx.putImageData(i, x, y);
    },
    // Transform
    scale: function (x, y) {
        this.cx.scale(x, y);
    },
    rotate: function (g) {
        this.cx.rotate(g);
    },
    translate: function (x, y) {
        this.cx.translate(x, y);
    },
    // Mis
    save: function () {
        this.cx.save();
    },
    restore: function () {
        this.cx.restore();
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
