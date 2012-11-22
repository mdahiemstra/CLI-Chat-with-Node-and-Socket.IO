var io     = require('socket.io-client'),
    prompt = require('prompt');
var socket = io.connect('http://localhost:5000');

var user_properties = [{
        name: 'username', 
        description: 'what is saf',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
}];

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

function onErr(err) {
    console.log(err);
    return 1;
}