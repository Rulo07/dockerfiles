var express = require('express')
global.__basedir = __dirname
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var router = require('./api')
var fs = require('fs')
var util = require('util')
let init = require("./database/init");
require('dotenv').config()
app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));     // to support URL-encoded bodies

app.use(cors())

router(app)
init.connect();
init.createDatabase();
init.createTableUser();
init.createTableCodeSession();
init.createAdminUser();

try {
    init.connectSystemDB();
} catch(e) {
    console.log('Error connecting to system database ', e.stack);
}

app.get('/', function (req, res) {
    return res.send({ message: 'Hello. Welcome to IALift API' })
});

app.listen(process.env.PORT || 4000, function() {
  console.log('Server running on port ' + process.env.PORT + "!!");
})
