const socket=io();

let ctx;
let canvas;

const graphics = new Graphics();
const camera = new Camera();
const tileMap = new TileMap(0,0,20,60);

graphics.add("dirt", "images/dirt.png");
graphics.add("sky", "images/sky.png");
graphics.add("frogresting", "images/resting.png");

tileMap.tiles = 
`#......#...........#\
...................#\
....................\
....................\
....................\
....................\
....................\
....................\
..............#.....\
..............#.....\
..............#.....\
..............#.....\
..............#.....\
....#.....#...#.....\
.....######...#.....\
....................\
..#........#........\
...#########........\
........#...........\
......#.............\
#......#...........#\
...................#\
....................\
....................\
....................\
....................\
....................\
....................\
..............#.....\
..............#.....\
..............#.....\
..............#.....\
..............#.....\
....#.....#...#.....\
.....######...#.....\
....................\
..#........#........\
...#########........\
........#...........\
......#.............\
#......#...........#\
...................#\
....................\
....................\
....................\
....................\
....................\
....................\
..............#.....\
..............#.....\
..............#.....\
..............#.....\
..............#.....\
....#.....#...#.....\
.....######...#.....\
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

let player = [];
let uniqueId = 0;
player[uniqueId] = new Player(5,5)
let jumpTimer = 0.0;
let mouseHeld = false;

function draw() {
    ctx.fillStyle="white";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.strokeRect(0,0,ctx.canvas.width,ctx.canvas.height);
    tileMap.draw();
    for(let i = 0; i < player.length; i++) {
        player[i].draw();
    }
}

let prevTime = 0;

function tick(totalTime) {
    let elapsedTime = (totalTime-prevTime)/1000;
    prevTime = totalTime;

    player[uniqueId].tick(elapsedTime);

    if(mouseHeld) {
        if(jumpTimer<2) jumpTimer+=elapsedTime;
        else jumpTimer = 2;
    }

    socket.emit("p-update", {x:player[uniqueId.x], y:player[uniqueId].y})

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

    if(e.key=="ArrowUp") {
        camera.y--;
    }
    else if(e.key=="ArrowDown") {
        camera.y++;
    }
    else if(e.key == "a") {
        player[uniqueId].vx = -1;
    }
    else if(e.key=="d") {
        player[uniqueId].vx = 1;
    }

});



document.addEventListener("mousedown",handleMouseDown);


//document.addEventListener("touchend", handleMouseUp);
//document.addEventListener("touchstart", handleMouseDown);

document.addEventListener("mouseup",handleMouseUp);

function handleMouseDown(e) {
    if(player[uniqueId].canJump)
    mouseHeld=true;
    //alert("mousedown")
}

function handleMouseUp(e) {

    
    const box = canvas.getBoundingClientRect();
    const mouseX = (e.clientX-box.x)/cellSize+camera.x;
    const mouseY = (e.clientY-box.y)/cellSize+camera.y;

    console.log(mouseX);
    console.log(mouseY);
    console.log(camera.x);
    console.log(camera.y);

    const diffX = mouseX - player[uniqueId].x;
    const diffY = mouseY - player[uniqueId].y;

    const distance = Math.sqrt(diffX*diffX+diffY*diffY);

    if(player[uniqueId].canJump) {
    player[uniqueId].vx = (diffX/distance)*20*(jumpTimer/2);
    player[uniqueId].vy = (diffY/distance)*30*(jumpTimer/2);
    player[uniqueId].hasGravity=true;
    player[uniqueId].canJump=false;
    }
//alert("mouseup")

mouseHeld = false;
jumpTimer = 0;
}



