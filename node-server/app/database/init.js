require('dotenv').config();
var mysql = require('mysql');
var userManager = require('../api_managers/userManager');
const { LOCAL_HOST, LOCAL_PORT, LOCAL_USERNAME, LOCAL_PWD, LOCAL_DATABASE, ADMIN, ADMIN_PWD,
        SYSTEM_HOST, SYSTEM_PORT, SYSTEM_USERNAME, SYSTEM_PWD, SYSTEM_DATABASE } = process.env;

var connect = mysql.createConnection({
  host     : LOCAL_HOST,
  port     : LOCAL_PORT,
  user     : LOCAL_USERNAME,
  password : LOCAL_PWD,
  database : LOCAL_DATABASE
});

var connectSystem = mysql.createConnection({
  host     : SYSTEM_HOST,
  port     : SYSTEM_PORT,
  user     : SYSTEM_USERNAME,
  password : SYSTEM_PWD,
  database : SYSTEM_DATABASE
})

module.exports = {
  connect: function(){
   connect.connect(function(err) {
   if (err) throw err;
     console.log("Connected to my own database!");
   });
  },

  connectSystemDB: function(){
    connectSystem.connect(function(err) {
    if (err) throw err;
     console.log("Connected to system database!");
    });
  },

  end: function(){
    connect.end(function(err) {
      // The connection is terminated now
    });
  },

  createDatabase: function(){
    var sql = "CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}";
    connect.query(sql, function (err, result) {
    });
  },

  createTableUser: function(){
    var sql = `CREATE TABLE IF NOT EXISTS users(user VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255), admin BOOLEAN DEFAULT 0, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;
    connect.query(sql, function (err, result) {
    });
  },

  createAdminUser: function(){
    userManager.createAdmin(ADMIN, ADMIN_PWD);
  },

  createTableCodeSession: function(){
    var sql = `CREATE TABLE IF NOT EXISTS code_session(user VARCHAR(255), token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user) REFERENCES users(user))`;
    connect.query(sql, function (err, result) {
    });
  }

}
