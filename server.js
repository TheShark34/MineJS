var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var yaml = require('js-yaml');
var User = require('./core/User');

app.use("/static",express.static("static"));
app.use("/partials",express.static("core/partials"));

app.get("/",function(request,response){
	response.sendFile(__dirname+"/core/partials/index.html");
});

io.on("connection",function(socket){
	var user = new User(socket);
});

var user = new User();
user.infos.username = "baptiste";
user.setPassword("yolo");
user.save();

console.log("Ecoute ...");
http.listen(80);