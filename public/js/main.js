const socket=io();

let ctx;
let canvas;

const graphics = new Graphics();
const camera = new Camera();
const tileMap = new TileMap(0,0,20,20);

tileMap.tiles = 
`#......#...........#\
...................#\
....................\
....................\
....................\
....................\
....................\
....................\
....................\
....................\
....................\
....................\
....................\
....#.....#.........\
.....######.........\
....................\
..#........#........\
...#########........\
........#...........\
......#.............
`;

let cellSize;
//Run once when the page is loaded
function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");    
    
    resizeCanvas();
    window.requestAnimationFrame(tick);
}

let player = new Player(5,5);

function draw() {
    ctx.fillStyle="white";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.strokeRect(0,0,ctx.canvas.width,ctx.canvas.height);
    tileMap.draw();
    player.draw();
}

let prevTime = 0;

function tick(totalTime) {
    let elapsedTime = (totalTime-prevTime)/1000;
    prevTime = totalTime;

    player.tick(elapsedTime);

    draw();
    window.requestAnimationFrame(tick);
}

function resizeCanvas() {
    if(window.innerWidth>window.innerHeight){
    ctx.canvas.width = window.innerHeight;
    ctx.canvas.height=window.innerHeight;
    }
    else {
    ctx.canvas.width=window.innerWidth;
    ctx.canvas.height=window.innerWidth;
    }
    cellSize = ctx.canvas.width/20;
}


document.addEventListener("keydown",(e)=>{

    if(e.key=="ArrowLeft") {
        camera.x--;
    }
    else if(e.key=="ArrowRight") {
        camera.x++;
    }
    else if(e.key == "a") {
        player.vx = -1;
    }
    else if(e.key=="d") {
        player.vx = 1;
    }

});

document.addEventListener("mousedown",(e)=>{
    const box = canvas.getBoundingClientRect();
    const mouseX = (e.clientX-box.x)/cellSize+camera.x;
    const mouseY = (e.clientY-box.y)/cellSize+camera.y;

    console.log(mouseX);
    console.log(mouseY);
    console.log(camera.x);
    console.log(camera.y);

    const diffX = mouseX - player.x;
    const diffY = mouseY - player.y;

    const distance = Math.sqrt(diffX*diffX+diffY*diffY);

    player.vx = (diffX/distance)*10;
    player.vy = (diffY/distance)*30;
    player.hasGravity=true;
    
});

document.addEventListener("mouseup",(e)=>{

});