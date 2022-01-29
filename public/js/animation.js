class Animation {
    constructor(x,y) {
        this.w=2;
        this.h=2;
        this.x=x-this.w/2;
        this.y = y-this.h/2;

        this.image = "explosion1";
   
        this.time = 0.5;
        this.startTime = 0.5;
        this.alive = true;
    }
    draw() {

        ctx.drawImage(graphics.get(this.image),this.x*cellSize,this.y*cellSize, this.w*cellSize,this.h*cellSize)
    }
    tick(elapsedTime) {

        let percent = this.time / this.startTime;

        if(percent < 0.7 && percent>.4) {
            this.image="explosion2";
        }
        else if(percent<0.4) {
            this.image="explosion3";
        }

        this.time-=elapsedTime;
        this.w+=10*elapsedTime;
        this.h+=10*elapsedTime;
        this.x-=5*elapsedTime;
        this.y-=5*elapsedTime;
        if(this.time<=0) {
            this.alive=false;
        }
    }
}