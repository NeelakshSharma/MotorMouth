
var app = require('express')();
var http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

var count = 0;

io.on('connection', function(socket){
    count++;
    console.log(count)
    io.emit('count',count)
    socket.on('message',function(messageObject){
    io.emit('messageReceive',messageObject)
    })
    socket.on('typing',function(name){
        socket.broadcast.emit('typing',name)
    })
  });