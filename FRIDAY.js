const fs = require('fs');
const path = require("path");
const port = process.env.PORT || 8080;

const express = require('express');
const app = express();

const https = require('https');
const options = {
    key: fs.readFileSync(path.join(__dirname,'localhostkeys/key.pem') ),
    cert: fs.readFileSync(path.join(__dirname,'localhostkeys/cert.pem') ),
    passphrase: 's#cR3T',
    requestCert: false,
    rejectUnauthorized: false
};
const server = https.createServer( options, app );

server.listen( port, () => {
    console.log( 'Express server listening on port ' + server.address().port );
} );

var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO
    ledRed = new Gpio(27, {mode: Gpio.OUTPUT}), //use GPIO pin 27 as output for RED
    ledGreen = new Gpio(17, {mode: Gpio.OUTPUT}), //use GPIO pin 17 as output for GREEN
    ledBlue = new Gpio(22, {mode: Gpio.OUTPUT}), //use GPIO pin 22 as output for BLUE
    redRGB = 0, //set starting value of RED variable to off (0 for common cathode)
    greenRGB = 0, //set starting value of GREEN variable to off (0 for common cathode)
    blueRGB = 0; //set starting value of BLUE variable to off (0 for common cathode)

//RESET RGB LED
ledRed.digitalWrite(0); // Turn RED LED off
ledGreen.digitalWrite(0); // Turn GREEN LED off
ledBlue.digitalWrite(0); // Turn BLUE LED off

io.sockets.on('connection', function (socket) {// Web Socket Connection
    socket.on('rgbLed', function(data) { //get light switch status from client
        //console.log(data); //output data from WebSocket connection to console

        //for common cathode RGB LED 0 is fully off, and 255 is fully on
        redRGB=parseInt(data.red);
        greenRGB=parseInt(data.green);
        blueRGB=parseInt(data.blue);

        ledRed.pwmWrite(redRGB); //set RED LED to specified value
        ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
        ledBlue.pwmWrite(blueRGB); //set BLUE LED to specified value
    });
});

process.on('SIGINT', function () { //on ctrl+c
    ledRed.digitalWrite(0); // Turn RED LED off
    ledGreen.digitalWrite(0); // Turn GREEN LED off
    ledBlue.digitalWrite(0); // Turn BLUE LED off
    process.exit(); //exit completely
});
app.use(express.static(path.join(__dirname, "./public")));