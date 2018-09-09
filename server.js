// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// npm package that might be more accurate than my method
// var requestIp = require('request-ip');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// app.use(requestIp.mw())
 
// app.use(function(req, res) {
//     const ip = req.clientIp;
//     // res.send(ip);
//     res.json({ip: ip})
// });

app.get("/", function (req, res) {
  // var output = {ip: ipAddr, language: lang, software: sw}
  var ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  var lang = req.headers['accept-language'].split(',')[0]
  var sw = req.headers['user-agent'].match(/\((.+?)\)/)[1]
  
  // check and process if ip str is longer than the longest possible ipv4 address
  if (ipAddr.length > 15) {
    ipAddr = ipAddr.split(',')[0]
  }

  // res.send(req.headers)
  res.send({ip: ipAddr, language: lang, software: sw})
})

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
