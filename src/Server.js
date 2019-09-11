
var app = require('express')();
var http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

io.on('connection', function(socket){
    console.log('a user connected'+socket.id);
    socket.on('message',function(messageObject){
    io.emit('messageReceive',messageObject)
    })
  });