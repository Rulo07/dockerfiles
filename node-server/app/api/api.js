var express = require('express')
let db = require("../database/db");
let User = require("../database/schemas/user");
let Code = require("../database/schemas/codeSession");
let CodeManager = require('../api_managers/codeSessionManager');
var constants = require ("../constants/constants");
//BigML
var bigml = require('bigml')
var username = 'sergioberdiale-1'
var api_key = '91bed27d58d45c976d748112b0b8424de90870d7'
var url_ensemble = 'ensemble/5e303fdd5a2139643d00537f'
var my_storage = './model';
var connection = new bigml.BigML(username, api_key, {storage: my_storage});
var prediction = new bigml.Ensemble(connection)

function setApiRoutes (app) {
  app.post("/api/token", (req, res, next) => {
    db.query(Code.checkToken(req.body.token), (err, data) => {
      if(data && data.length > 0){
          var actual = new Date().getTime();
          var checktimeStamp = data[0].created_at.getTime() + constants.timeExpired
          if(actual > checktimeStamp){
            db.query(Code.deleteToken(req.body.token), (err, data)=> {
                res.json({ alive: "no" })
            });
          }
          else
            res.json({ alive: "yes" })
      }
      else
        res.status(404).json({ alive: "no" })
    });
  });

  app.post("/api/floor", (req, res, next) => {
    let secondsWait = 0
    let endFloor_1 = 0
    let startFloor = req.body.start_floor_number
    let startState = req.body.start_stated_id
    let lastHourCall_2 = 0
    let lastThreeMinutes_0 = 0
    let startFloor_1 = 0
    let lastThreeMinutes_3 = 0
    let lastMinute_3 = 0
    let lastThreeMinutes_2 = 0

    async function wait(){
      let data2
      await CodeManager.getLastMinutes().then( data => {
        data2 = data
        console.log("**** RESULT CALLS ****")
        console.log(data2)
      }, err => {
        res.status(404).json({ message: err })
      });
      let data3 = await CodeManager.getValuePreviousTable();
      console.log("**** RESULT VALUES TABLE ****")
      console.log(data3)
      if(data3 == false || data2 == false)
        res.status(404).json('Error. no hay ningún registro asociado a los parámetros introducidos')
      else{
        secondsWait = data3[0].SecondsWait
        endFloor_1 = data3[0].EndFloorNumber + "-" + data3[0].StartStateId

        startFloor_1 = data3[0].StartFloorNumber
        lastThreeMinutes_0  = data2[0].numberCall
        lastThreeMinutes_2  = data2[1].numberCall
        lastThreeMinutes_3  = data2[2].numberCall
        lastHourCall_2 = data2[3].numberCall
        lastMinute_3 = data2[4].numberCall

        var ensemble = new bigml.LocalEnsemble(url_ensemble, connection);
        ensemble.predict(
             {'SecondsWait_1': secondsWait, 'EndFloor_State_1': endFloor_1,
              'StartFloorNumber': startFloor, 'StartStateId': startState, 'last_hour_calls_2': lastHourCall_2,
              'last_three_minutes_calls_0': lastThreeMinutes_0, 'StartFloorNumber_1': startFloor_1,
              'last_three_minutes_calls_3': lastThreeMinutes_3, 'last_minute_calls_3': lastMinute_3,
              'last_three_minutes_calls_2': lastThreeMinutes_2},
              function(error, prediction) {
                if(!error){
                  console.log(prediction)
                  res.json({ distribution: prediction.distribution })
                }
                else
                  res.status(404).json(error)
        });
      }
    }
    wait()
  });
}
module.exports = setApiRoutes;
