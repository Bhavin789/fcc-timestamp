// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const isValidDate = (d) => ( Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime()));

const isValidNumber = (num) => !isNaN(Number(num));

app.get("/api/:date?", function (req, res) {
  const date = req.params.date;

  if(!date){
    return res.json({"unix":new Date().getTime(),"utc": new Date().toUTCString()});  
  }

  if(isValidNumber(date)){
    const timestamp = Number(date);

    if(!isValidDate(new Date(timestamp))){
      return res.json({error: "Invalid Date"})
    }

    return res.json({"unix":new Date(timestamp).getTime(),"utc": new Date(timestamp).toUTCString()});
  } 

  if(!isValidDate(new Date(date))){
      return res.json({error: "Invalid Date"})
  }

  return res.json({"unix":new Date(date).getTime(),"utc": new Date(date).toUTCString()});  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
