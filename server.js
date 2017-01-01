var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Carpool = require('./carpool');

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

var exampleName = new Carpool("Nathaniel", "Choe", "Sample Carpool", "nc@gmail.com", "703-222-2222", "Vienna",
"Alexandria", [0, 2, 1, 1, 1, 1, 1]);
var carpools = [exampleName];
//console.log(exampleName.fname());

io.on("connection", function(socket){
    
    io.emit("carpool-update", carpools);
    
    socket.on("add-carpool", function(data){
        var cp = new Carpool(data.fname, data.lname, data.desc, data.email, data.phone, data.loc1, data.loc2, data.days); 
        carpools.push(cp);
        io.emit("carpool-update", carpools);
    });

});


http.listen(5000, function(){
    console.log("listening on *:5000");
});
