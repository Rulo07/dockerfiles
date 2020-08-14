let Code = require('../database/schemas/codeSession');
let Utilities = require('./utilities')
let db = require("../database/db");
let dbSystem = require("../database/dbSys");
let constants = require ("../constants/constants");
class CodeSessionManager {
  static findByToken(token) {
    return new Promise((resolve, reject) => {
      db.query(Code.checkToken(token), (err, data)=> {
          if(data && data.length > 0) {
            var actual = new Date().getTime();
            var checktimeStamp = data[0].created_at.getTime() + constants.timeExpired
            if(actual > checktimeStamp){
              db.query(Code.deleteToken(token), (err, data)=> {
              });
              resolve(null)
            }
            else
              resolve(data)
          }
          else{
            console.log(err)
            resolve(null)
          }
      });
    })
  }

  static getValuePreviousTable() {
    return new Promise((resolve, reject) => {
      dbSystem.query(Code.getValuePreviousTableIALiftbd(), (err, data) => {
        if(!err){
          console.log("****** RETURN MANAGER VALUES TABLE ******+")
          console.log(data)
          if(data.length > 0){
            data[0].StartStateId = Utilities.transformStateId(data[0].StartStateId)
            resolve(data)
          }
          else {
            resolve(false)
          }
        }
        else{
          console.log("****** ERROR MANAGER VALUES TABLE ******+")
          console.log(err)
          return reject(err.sqlMessage)
        }
      })
    })
  }

  static getLastMinutes() {
    return new Promise((resolve, reject) => {
      dbSystem.query(Code.getLastMinutes(), (err, data) => {
          console.log("****** RETURN CALLS ******+")
          console.log(data)
          if(!err){
            if(data.length > 0){
              resolve(data)
            }
            else{
              resolve(false)
            }
          }
          else{
            console.log("****** ERROR CALLS ******+")
            console.log(err)
            return reject(err.sqlMessage)
          }
        })
    })
  }


}
module.exports = CodeSessionManager
