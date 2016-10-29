var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('action', { type: 'generateFaders', amount: 32 });
  socket.on("faderChange", function(fader) {
    session.sendMessage([176, fader.fader, fader.value]);
    console.log("Sending MIDI...");
    console.log([176, fader.fader, fader.value]);
  });
});
var rtpmidi = require('rtpmidi'),
    // Use 'npm install midi' to install the midi module
    midi = require('midi'),
    input = new midi.input(),
    output = new midi.output(),
 
    session = rtpmidi.manager.createSession({
      localName: 'Session 1',
      bonjourName: 'Node RTPMidi',
      port: 5008
    });

// Enable some console output;
//rtpmidi.log.level = 4;

// Create the virtual midi ports
input.openVirtualPort("My Virtual Midi Input");
output.openVirtualPort("My Virtual Midi Output");
 
// Route the messages
session.on('message', function(deltaTime, message) {
  var commands = Array.prototype.slice.call(message, 0);
  console.log(commands);
  console.log(deltaTime);
  if (commands[1] >= 0 && commands[1] <= 32) {
    io.emit("faderChange", {
      "fader": commands[1],
      "value": commands[2]
    })
  }
});
 
input.on('message', function(deltaTime, message) {
  //console.log('received a local message', message);
  session.sendMessage(deltaTime, message);
});