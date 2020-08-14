var express = require('express')
let db = require("../database/db");
let User = require("../database/schemas/user");
let Code = require("../database/schemas/codeSession");
let authMiddleware = require('../middlewares/auth')
let bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

function setUserRoutes (app) {
  app.get("/user/all", (req, res, next) => {
      db.query(User.getAllUsers(), (err, data)=> {
          if(!err) {
              res.status(200).json({
                  status: "all_users",
                  users: data
              });
          }
          else{
            res.status(400).json({
              status: "no_users"
            })
          }
      });
  });

  app.post("/user/add", (req, res, next) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if (err) return next(err);

          let user = new User(req.body.user, hash);
          db.query(user.getAddUser(), (err, data)=> {
              if(!err){
                console.log("user ", user);
                res.status(200).json({
                  status: "user_added"
                });
              }
              else{
                res.status(400).json({
                  // status: err.sqlMessage
                  status: "user_not_added"
                })
              }
          });
        });
      });
  });

  app.post("/user/search", (req, res, next) => {
      db.query(User.getUser(req.body.user), (err, data)=> {
          if(!err) {
              if(data && data.length > 0) {
                  res.status(200).json({
                      status: "user_found",
                      user: data[0].user,
                      created: data[0].created_at
                  });
              } else {
                  res.status(404).json({
                      status: "user_not_found"
                  });
              }
          }
      });
  });

  app.post("/login", (req, res, next) => {
    db.query(User.getUser(req.body.user), (err,data) => {
      if(!err){
        let user = data[0];
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
              if (isMatch) {
                let token = Math.random().toString(36).substring(2, 18) + Math.random().toString(36).substring(2, 18);
                let code = new Code(req.body.user, token);
                db.query(code.getAddCode(), (err, data)=> {
                  if(!err)
                    console.log("Token saved")
                  else
                    console.log(err)
                });
                res.status(200).json({
                    status: "login_ok",
                    auth_token: token
                });
              }
              else{
                res.status(401).json({
                    status: "login_fail",
                    auth_token: 'none'
                });
              }
            });
        }
        else{
          res.status(404).json({
              status: "login_not_found"
          });
        }

      }
      else{
        res.status(404).json({
            status: "login_not_found"
        });
      }
    });
  });
}
module.exports = setUserRoutes;
