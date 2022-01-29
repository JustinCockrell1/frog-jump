class Manager {
    constructor() {
        this.items = [];
    }

    tick(elapsedTime) {
        this.items.forEach((item,i)=>{
            if(item.alive)
            item.tick(elapsedTime);
            else 
            this.items.splice(i,1);
        })
    }
    draw() {
        this.items.forEach((item)=>{
            if(item.alive)
            item.draw();
        })
    }
    add(item) {
        this.items.push(item);
    }
}