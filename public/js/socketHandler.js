socket.on('setfrogs', (frogs)=>{
    player = [];
    for(let i = 0; i < frogs.length; i++) {
        player.push(new Player(frogs[i].x, frogs[i].y));
        console.log(frogs[i]);
    }
});

socket.on('setid', (id)=>{
    uniqueId = id;
})

socket.on("userdisconnect", (msg)=>{
    player.splice(msg,1);
    if(uniqueId>=msg)uniqueId--;
});

socket.on("p-update", (msg)=>{
    console.log(msg);
    player[msg.id].x=msg.pos.x;
    player[msg.id].y=msg.pos.y;
    player[msg.id].dir=msg.pos.d;
   
});

socket.on("addfrog",(msg)=>{
    player.push(new Player(msg.x, msg.y));
});