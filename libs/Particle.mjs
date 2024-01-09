export default class Particle {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.velx = 0;
        this.vely = 0;
        this.dirx = 0;
        this.diry = 0;
        this.angle = 0;
        this.noise = null;
        this.noise_size_x = 0.01;
        this.noise_size_y = 0.01;
        this.mult = 0.5;
        this.amt = 10;
        this.data = {};
    }
    update(n) {
        this.noise = n(
            this.x * this.noise_size_x,
            this.y * this.noise_size_y,
            this.y * this.noise_size_y,
        );

        this.angle = this.noise * (Math.PI * 2) * this.amt;
        this.dirx = Math.cos(this.angle);
        this.diry = Math.sin(this.angle);
        this.velx += this.dirx;
        this.vely += this.diry;
        this.velx *= this.mult;
        this.vely *= this.mult;
        if (Math.abs(this.velx) < 0.5) this.velx *= 2;
        if (Math.abs(this.vely) < 0.5) this.vely *= 2;
        this.x += this.velx;
        this.y += this.vely;
    }
    render(cb) {
        cb(this.x, this.y);
    }
    applyForce(x, y) {
        this.velx += x;
        this.vely += y;
    }
}
