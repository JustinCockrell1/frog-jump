class Player extends PhysicsObject {
    constructor(x, y) {
        super(x,y,1,1,0,0,true);
        this.onGround = false;
    }

    draw() {
        const pos = camera.getPos(this.x, this.y);
        const size = camera.getSize(this.w, this.h);
        ctx.fillStyle="blue";
        ctx.fillRect(pos.x, pos.y, size.w, size.h);
    }

    handleCollisions() {
        const points = [{x:0,y:0},{x:1,y:0},{x:0,y:.9},{x:.9,y:.9}];

        for(let i = 0; i < points.length; i++) {
            if(tileMap.hitTile(this.x+points[i].x, this.y+points[i].y)=='#') {
                //console.log(this.vy);
                //this.hasGravity=false;
                this.hasGravity = false;
                this.vy = 0;
                this.vx=0;
                this.y = Math.floor(this.y);
            } 
        }
    }
}