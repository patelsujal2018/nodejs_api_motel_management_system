//var fs = require('fs');
var http = require('http');
//var https = require('https'); // use only for https
var express = require("express");
const helmet = require("helmet");
var cors = require('cors')
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

// use only for https
/* var privateKey = fs.readFileSync('sslcert/server.key','utf-8');
var certificate = fs.readFileSync('sslcert/server.crt','utf-8');
var credentials = { key: privateKey, cert: certificate }; */

var app = express();
app.use(helmet());
app.use(cors({ credentials:true, origin:'http://localhost:8080' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




/* route start */

var authRouter = require('./routes/auth');
app.use('/auth',authRouter);

/* route end */






const hostname = process.env.NODE_API_URL || 'localhost';
const port = process.env.NODE_API_PORT || '8000';

const httpServer = http.createServer(app);
httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// use only for https
/* const httpsServer = https.createServer(credentials,app);
httpsServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`); // make this port different from simple http
}); */