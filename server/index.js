var express = require ('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/oi-mundo', function(req,res){
	res.status(200).send('Oi Mundo');
});

var messages = [{
	id: 1,
	text: 'Bemvindo ao chat privado de Socket.io e Node.js',
	nickname: 'Bot - Marcelo diz:'
}] 

io.on('connection', function(socket){
	console.log('O cliente com ip: '+socket.handshake.address+' se conectou');
	socket.emit('messages', messages);
	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages',messages);
	});
});

server.listen(6677, function(){
	console.log('Servidor está funcionando em http://localhost:6677');
});