class Graphics {
    constructor() {
        this.graphic = {};
    }

    add(name,filename) {
        this.graphic[name] = new Image();
        this.graphic[name].src = filename;
    }
    get(name) {
        return this.graphic[name];
    }
}
