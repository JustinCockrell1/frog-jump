class PhysicsObject {
    constructor(x,y,w,h,vx,vy,gravity) {
        this.x = x;
        this.y = y;
        this.w=w;
        this.h=h;
        this.vx = vx;
        this.vy = vy;
        this.hasGravity = gravity;
    }

    handleCollisions(){}

    tick(elapsedTime) {
        this.x+=this.vx*elapsedTime;
        this.y+=this.vy*elapsedTime;
        if(this.hasGravity) {
              //Gravity
        if(this.y+this.h < 17)
        this.vy += 30*elapsedTime;
        else {
            this.y = 17 - this.h;
            this.vy = 0;
        }
        }
        this.handleCollisions();
    }
}

