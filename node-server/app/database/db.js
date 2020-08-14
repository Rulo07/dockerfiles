require('dotenv').config();
var mysql = require('mysql');

const { LOCAL_HOST, LOCAL_PORT, LOCAL_USERNAME, LOCAL_PWD, LOCAL_DATABASE } = process.env;
const pool = mysql.createPool({
  connectionLimit : 10,
  host     : LOCAL_HOST,
  port     : LOCAL_PORT,
  user     : LOCAL_USERNAME,
  password : LOCAL_PWD,
  database : LOCAL_DATABASE,
  debug    : false
});

function executeQuery(sql, callback) {
  pool.getConnection((err,connection) => {
      if(err) {
          return callback(err, null);
      } else {
          if(connection) {
              connection.query(sql, function (error, results, fields) {
              connection.release();
              if (error) {
                  return callback(error, null);
              }
              return callback(null, results);
              });
          }
      }
  });
}

function query(sql, callback) {
  executeQuery(sql,function(err, data) {
      if(err) {
          return callback(err);
      }
      callback(null, data);
  });
}

module.exports = {
  query: query
}
