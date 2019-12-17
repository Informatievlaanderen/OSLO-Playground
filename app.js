//require Express
const express = require('express');
// instanciate an instance of express and hold the value in a constant called app
const app = express();
//require the body-parser library. will be used for parsing body requests
const bodyParser = require('body-parser');
const fs = require('fs');
const tempWrite = require('temp-write');
const request = require('request');


// use the bodyparser as a middleware
app.use(bodyParser.json())
// set port for the app to listen on
app.set('port', process.env.PORT || 3002);
// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/validation', async function (req, res) {
    console.log("LETS GO");
    const data = JSON.parse(req.body.data);

    if (!req.body.shaclFile) {
        const applicationProfile = req.body.ap;
        const filePath = tempWrite.sync(data);

        // TODO - send data to validator --> gives error

    } else {
        const shaclFile = req.body.shaclFile;
    }
})

// listen on the specified port
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
