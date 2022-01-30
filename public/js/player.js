class Player extends PhysicsObject {
    constructor(x, y) {
        super(x,y,1,1,0,0,true);
        this.onGround = false;
        this.canJump = true;
    }

    draw() {
        const pos = camera.getPos(this.x, this.y);
        const size = camera.getSize(this.w, this.h);
        //ctx.fillStyle="blue";
       // ctx.fillRect(pos.x, pos.y, size.w, size.h);
        ctx.drawImage(graphics.get("frogresting"), pos.x, pos.y, size.w, size.h);
    }

    jump() {

    }

    handleCollisions() {
        const points = [{x:0,y:0},{x:1,y:0},{x:0,y:.9},{x:.9,y:.9}];

        for(let i = 0; i < points.length; i++) {
            if(tileMap.hitTile(this.x+points[i].x, this.y+points[i].y)=='#') {
                const tileL = Math.floor(this.x+points[i].x);
                const tileT = Math.floor(this.y+points[i].y);
                const tileR = tileL+1;
                const tileB = tileT+1;
                const tileCenterX = tileL+0.5;
                const tileCenterY = tileT+0.5;

                const centerX = this.x+this.w/2;
                const centerY = this.y+this.h/2;

                const diffX = Math.abs(tileCenterX-this.x+points[i].x);
                const diffY = Math.abs(tileCenterY-this.y+points[i].y);

                if(diffX<diffY) {
                    if(centerY>tileCenterY) {
                        this.vy = 0;
                        this.y = Math.floor(this.y)+1;
                    }
                    else {
                        this.hasGravity = false;
                        this.onGround=true;
                        this.canJump = true;
                        this.vy = 0;
                        this.vx = 0;
                        this.y = Math.floor(this.y);
                    }
                }
                else if(diffX>diffY){
               
                    if(centerX>tileCenterX) {
                        this.vx *=-1;
                        this.x = Math.floor(this.x)+1;
                    }
                    else {
                        this.vx *=-1;
                        this.x = Math.floor(this.x);
                    }
                }
              

               

            
            } 
        }
    }
}