// npm install express
// npm install serialport
// npm install json-scrape
// npm install moment
// npm install socket.io

console.log("carduino v0.0.1")
console.log("github.com/bitlabio/carduino")

var moment = require('moment');

/*
var app = express()
app.use(express.static('static'))

app.listen(3000, function () {
  console.log('Open http://localhost:3000/ in your browser.')
})*/

var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static('static'))
 

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000); 

/* ---------------------- */

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

    client.on('messages', function(data) {
           client.emit('broad', data);
           client.broadcast.emit('broad',data);
    }); 

   });
/* ---------------------- */ 

var SerialPort = require("serialport"); // so we can access the serial port
var scraper = require('json-scrape')(); // cleans messy serial messages.

var arduino;

//LIST DEVICES/AUTODETECT
SerialPort.list( function (err, ports) {
	console.log(moment().format()+" Autodetecting Arduino devices...")
  for (var num in ports) {
    console.log(ports[num]);
    if (ports[num].manufacturer) {
     if (ports[num].manufacturer.slice(0,5) == 'Ardui') {
    	console.log(moment().format()+" Arduino detected on "+ports[num].comName)
    	arduino = new SerialPort(ports[num].comName, {baudrate: 115200}); //you must set the port and baudrate
    	arduConnect(arduino);
    }}
  }
});


var arduConnect = function (device) {
	ready = 1;
  	device.on("data", datahandler);
}

var datahandler = function (data) {
  scraper.write(data); 
}

scraper.on('data', function (data) {
  console.log(data)   
  
  io.sockets.emit("arduino", data)
});


/*
// TO SEND TO ARDUINO
// ideally this will be called from the browser event with socket io. 
// more in a later class on this.
  var data = { brightness: "0.1" }
  var test = JSON.stringify(data)    // turns into string to send
  console.log(test)
  arduino.write(test)
*/