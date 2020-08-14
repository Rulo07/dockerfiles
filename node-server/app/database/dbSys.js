require('dotenv').config();
var mysql = require('mysql');

const { SYSTEM_HOST, SYSTEM_PORT, SYSTEM_USERNAME, SYSTEM_PWD, SYSTEM_DATABASE } = process.env;
const pool = mysql.createPool({
  connectionLimit : 10,
  host     : SYSTEM_HOST,
  port     : SYSTEM_PORT,
  user     : SYSTEM_USERNAME,
  password : SYSTEM_PWD,
  database : SYSTEM_DATABASE,
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
