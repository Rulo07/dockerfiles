let CodeManager = require('../api_managers/codeSessionManager');
let db = require("../database/db");
function authMiddleware (req, res, next) {
  let authHeader = req.header('Authorization');
  if(authHeader){
    let token = authHeader.split(' ')[1];
    if(token){
      CodeManager.findByToken(token).then((user) => {
        if(user && user.length > 0){
          req.user = user
        }
        next()
      })
    }
  }
  else
    next()
}
module.exports = authMiddleware
