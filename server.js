var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Carpool = require('./carpool');
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

var url = "mongodb://steven:stevenli@ds023694.mlab.com:23694/carpool-tjhsst"

function insertData(fname, lname, desc, email, phone, loc1, loc2, days){
    
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection("carpools").insertOne({
            "fname":fname,
            "lname":lname,
            "desc":desc,
            "email":email,
            "phone":phone,
            "loc1":loc1,
            "loc2":loc2,
            "days":days
        }, function(err, result){
            assert.equal(err, null);
            console.log("inserted");
        });
        db.close();
    });

}

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

var exampleName = new Carpool("Steven", "Li", "Sample Carpool", "steve@gmail.com", "703-222-2222", "Vienna",
"Alexandria", [0, 2, 1, 1, 1, 1, 1]);
var carpools = [exampleName];

io.on("connection", function(socket){
    
    io.emit("carpool-update", carpools);
    
    socket.on("add-carpool", function(data){
        var cp = new Carpool(data.fname, data.lname, data.desc, data.email, data.phone, data.loc1, data.loc2, data.days); 
        carpools.push(cp);
        insertData(data.fname, data.lname, data.desc, data.email, data.phone, data.loc1, data.loc2, data.days);
        io.emit("carpool-update", carpools);
    });

    socket.on("add-participant", function(data){
        
    });


});


http.listen(5000, function(){
    console.log("listening on *:5000");
});
