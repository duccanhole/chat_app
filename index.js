const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = process.env.PORT || 5000;
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
let online = 0;
io.on('connection', (socket) => {
  online++;
  socket.on('disconnect', () => {
    online--;
    io.emit('online',online);
  });
  io.emit('online',online);
  socket.on('message',(msg,name)=>{
    io.emit('message', msg, name);
  })
});

server.listen(port,()=>{
    console.log('Server running at http://localhost:5000');
})
//-------------TASK : -----------------------
/* create name for each user
 * make a chat bot
 * show activity of chat box
*/