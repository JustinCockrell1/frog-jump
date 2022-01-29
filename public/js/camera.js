class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
    }
    getPos(x, y) {
        return {
            x:(x-this.x)*cellSize,
            y:(y-this.y)*cellSize
        };
    }
    getSize(w, h) {
        return {
            w:(w*this.zoom)*cellSize,
            h:(h*this.zoom)*cellSize
        };
    }
}