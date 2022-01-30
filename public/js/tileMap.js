
class TileMap {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.tiles = "";

        console.log("tile"+this.tiles+"tile");
    }

    getTile(x,y) {
        return this.tiles.charAt(y*this.w+x);
    }

    hitTile(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        x-=this.x;
        y-=this.y;
        return this.tiles.charAt(y*this.w+x);
    }

    topLeft() {
        
        return {
            x:Math.max(this.x+Math.floor(camera.x), this.x),
            y:Math.max(this.y+Math.floor(camera.y),this.y),
        };
    }
    bottomRight() {
        return {
            x:Math.min(this.w, this.w+Math.ceil(camera.x)),
            y:Math.min(this.h, this.h+Math.ceil(camera.y))
        };
    }

    draw() {
        const topLeft = this.topLeft();
        const bottomRight = this.bottomRight();
        for(let i = topLeft.x; i < bottomRight.x; i++) {
            for(let j = topLeft.y; j < bottomRight.y; j++) {
                const tile = this.getTile(i,j);
                const pos = camera.getPos(i+this.x,j+this.y);
                const size = camera.getSize(1,1);
                if(tile=="#") {
                 
                    ctx.fillStyle="red";
                    ctx.fillRect(pos.x, pos.y, size.w, size.h);
                    ctx.strokeRect(pos.x, pos.y, size.w, size.h);
                    ctx.drawImage(graphics.get("dirt"), pos.x, pos.y, size.w, size.h);
                    
                }
                else if(tile==".") {
                    ctx.drawImage(graphics.get("sky"), pos.x, pos.y, size.w, size.h);

                }
            }
        }
    }


}