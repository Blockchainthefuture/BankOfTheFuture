var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
    fs.writeFileSync("./Addresses/"+ makeid() + ".lol", msg , {"encoding":'utf8'});
  });
});


var fs = require('fs');
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    //console.log("The file was saved!");
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

//fs.writeFileSync(writeSource, "Writing to a file synchronously from node.js", {"encoding":'utf8'});
