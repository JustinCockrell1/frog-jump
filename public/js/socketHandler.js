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