// Light weight canvas 2d drawing inspired in p5js.
// Made for personal use.
// MIT License

const win = document.defaultView ?? window;
// Animation frame ----------------------------------------------
const animation =
    win.requestAnimationFrame ||
    win.mozRequestAnimationFrame ||
    win.webkitRequestAnimationFrame ||
    win.msRequestAnimationFrame;

const cancelAnimation = win.cancelAnimationFrame || win.mozCancelAnimationFrame;
// ---------------------------------------------------------------
// OBJ
const A2D = {
    frameCount: 1,
    animationID: null,
    cx: null,
    cv: null,
    w: null,
    h: null,
    _isFill: true,
    _isStroke: true,
    // INIT
    init(cb, optCanvas = {}) {
        const opts = {
            w: window.innerWidth,
            h: window.innerHeight,
            id: 'ad2Canvas',
            rf: true,
            ...optCanvas,
        };
        // Create canvas
        this.cv = document.createElement('canvas');
        this.cv.id = opts.id;
        this.cv.width = opts.w;
        this.cv.height = opts.h;
        document.body.appendChild(this.cv);
        this.w = this.cv.width;
        this.h = this.cv.height;
        // Context
        this.cx = this.cv.getContext('2d', { willReadFrequently: opts.rf });
        // Defaults
        this.cx.fillStyle = '#fff';
        this.cx.strokeStyle = '#000';
        this.cx.fillRect(0, 0, this.w, this.h);
        // Callback
        cb({ cx: this.cx });
        return this.cx;
    },

    // ANIMATE
    animate(cb, times = Infinity) {
        if (this.frameCount < times) {
            this.animationID = animation(() => {
                if (cb) {
                    cb({ cx: this.cx });
                }
                this.animate(cb, times);
                this.frameCount++;
            });
        } else {
            cancelAnimation(this.animationID);
        }
    },
    stroke(col = '#000', lw = 1) {
        this._isStroke = true;
        const ccol = col ?? '#fff';
        this.cx.strokeStyle = ccol;
        this.cx.lineWidth = lw;
    },
    noStroke() {
        this._isStroke = false;
    },
    fill(col = '#fff') {
        this._isFill = true;
        const ccol = col ?? '#fff';
        this.cx.fillStyle = ccol;
    },
    noFill() {
        this._isFill = false;
    },
    strokeSize(ss = 1) {
        this.cx.lineWidth = ss;
    },
    // Figures
    bg(c) {
        this.cx.save();
        this.cx.clearRect(0, 0, this.w, this.h);
        this.cx.fillStyle = c;
        // Fill background
        this.cx.fillRect(0, 0, this.w, this.h);
        // this.cx.fill();
        this.cx.restore();
    },
    line(x1, y1, x2, y2) {
        this.cx.beginPath();
        this.cx.moveTo(x1, y1);
        this.cx.lineTo(x2, y2);
        this.cx.closePath();
        this.cx.stroke();
    },
    point(x1, y1, lc = 'round') {
        this.cx.beginPath();
        this.cx.moveTo(x1, y1);
        this.cx.lineCap = lc;
        this.cx.lineTo(x1, y1);
        this.cx.stroke();
    },
    color(...c) {
        const r = c[0] ?? 255;
        const g = c.length > 2 ? c[1] : c[0];
        const b = c.length > 2 ? c[2] : c[0];
        const a = c.length > 2 ? c[3] : c[1] ?? 255;
        return `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},${
            Math.floor((a / 255) * 100) / 100
        })`;
    },
    circle(x, y, r) {
        this.cx.beginPath();
        this.cx.arc(x, y, Math.abs(r), 0, 2 * Math.PI, true);
        this.cx.closePath();
        if (this._isFill) this.cx.fill();
        if (this._isStroke) this.cx.stroke();
    },
    arc(x, y, r, a1, a2, ah = true) {
        this.cx.beginPath();
        this.cx.arc(x, y, Math.abs(r), a1, a2, ah);
        if (this._isFill) {
            this.cx.fill();
            this.cx.closePath();
        }
        if (this._isStroke) this.cx.stroke();
    },
    rect(x, y, w, h) {
        this.cx.beginPath();
        this.cx.rect(x, y, w, h);
        this.cx.closePath();
        if (this._isFill) this.cx.fill();
        if (this._isStroke) this.cx.stroke();
    },
    // Effects
    shadow(x = 0, y = 0, b = 10, c = '#000') {
        this.cx.shadowColor = c;
        this.cx.shadowOffsetX = x;
        this.cx.shadowOffsetY = y;
        this.cx.shadowBlur = b;
    },
    noShadow() {
        this.cx.shadowColor = 'rgba(0,0,0,0)';
        this.cx.shadowOffsetX = 0;
        this.cx.shadowOffsetY = 0;
        this.cx.shadowBlur = 0;
    },
    // Calc
    dist(x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    },
    map(v, a1, b1, a2, b2) {
        return a2 + ((b2 - a2) * (v - a1)) / (b1 - a1);
    },
    snap(v, s) {
        return Math.floor(v / s) * s;
    },
    // Image
    getImage(x, y, w = this.w, h = this.h) {
        return this.cx.getImageData(x, y, w, h);
    },
    image(i, x, y) {
        this.cx.putImageData(i, x, y);
    },
    smooth(s = true, q = 'low') {
        this.cx.imageSmoothingEnabled = s;
        this.cx.imageSmoothingQuality = q;
    },
    getPixelColor(img, x, y) {
        const i = y * (img.width * 4) + x * 4;
        const data = [
            img.data[i],
            img.data[i + 1],
            img.data[i + 2],
            img.data[i + 3],
        ];
        return {
            rgba: [data[0], data[1], data[2], data[3]],
            rgb: [data[0], data[1], data[2]],
            func: `rgba(${data[0]},${data[1]},${data[2]},${
                Math.round((data[3] / 255) * 100) / 100
            })`,
        };
    },
    loadImage(url, cb) {
        const img = new Image();
        img.src = url;
        const pg = document.createElement('canvas');
        img.onload = () => {
            const cx = pg.getContext('2d', { willReadFrequently: false });
            pg.width = img.width;
            pg.height = img.height;
            cx.drawImage(img, 0, 0);
            cb(cx.getImageData(0, 0, img.width, img.height));
        };
    },
    // Mutate original (img arg)
    setPixelColor(img, x, y, ...c) {
        const i = y * (img.width * 4) + x * 4;
        img.data[i] = c[0] ?? 255;
        img.data[i + 1] = c[1] ?? c[0];
        img.data[i + 2] = c[2] ?? c[0];
        img.data[i + 3] = c[3] ?? 255;
    },
    // Transform
    scale(...s) {
        const sx = s[0];
        const sy = s[1] ?? s[0];
        this.cx.scale(sx, sy);
    },
    rotate(g) {
        this.cx.rotate(g);
    },
    translate(x, y) {
        this.cx.translate(x, y);
    },
    // Mis
    save() {
        this.cx.save();
    },
    restore() {
        this.cx.restore();
    },
};
export default A2D;
