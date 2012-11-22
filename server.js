/* Start socket.io */
var io = require('socket.io').listen(5000);

var users = [];

/* Listen to incoming connections */
io.sockets.on('connection', function (socket) {
	
	console.log('user connected');
	
	/* Store user data, we need it before user gets disconnected */
	socket.on('message', function(data) {
	
		socket.broadcast.json.send({ 'message': data.body });
	});
	socket.on('connected_users', function(data) {
	
		users.push(data.name);
	});
	socket.on('userlist', function() {
	
		socket.broadcast.json.send({ 'userlist': users });
	});	
	
	
	/* Listen to disconnect */
	socket.on('disconnect', function () {
		
		console.log('user disconnected');
	});
});