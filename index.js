const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

const frogs = [];
const users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
    
    users.push(socket);
    socket.emit("setfrogs", frogs);
    socket.emit("setid", users.length-1);
    io.emit("addfrog", {x:15, y:55,d:1});
    frogs.push({x:15,y:55,d:1});


    socket.on('disconnect', (msg)=> {
        const i = users.indexOf(socket);
        users.splice(i,1);
        frogs.splice(i,1);
        io.emit('userdisconnect',i);
        console.log('user disconnected');
    });

    socket.on('p-update',(msg)=>{
        const i = users.indexOf(socket);
        //console.log(msg)
        frogs[i]=msg;
        socket.broadcast.emit('p-update', {pos:frogs[i], id:i});
        
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});