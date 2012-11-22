var io     = require('socket.io-client'),
    prompt = require('prompt');
var socket = io.connect('http://localhost:5000');

prompt.message = "!".green;

socket.on('connect', function() {
    
    prompt.start();

    console.log('Welcome to CLI-Chat!'.rainbow);
        
    prompt.get({properties: {name: { description: "What is your name?"}}},
        function (err, result) {
            if (result) {
                
                socket.emit('connected_users', {'name' : result.name});
   
                sendMessage(result.name);
            }
    });

    socket.on('message', function(data) {
       
       console.log(data.message);
    });    
});

var sendMessage = function (username) {
    
    prompt.get([{name: 'Message'}], function (err, result) {

        if (result) {
            socket.emit('message', {'body' : username.underline.green + ': ' + result.Message});
        
            sendMessage(username);
        }
    });
}