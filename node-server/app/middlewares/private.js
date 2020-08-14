let UserManager = require('../api_managers/userManager');
let privateRegex = new RegExp("^\/user\/?(\w+\/?)*")

var privateMiddleware = async function(req, res, next) {
  let match = privateRegex.exec(req.path)
    if (match && match != 0) {
      if (!req.user){
        res.status(401).json({})
      } else {
        const admin = await UserManager.isAdmin(req.user[0].user);
        if(admin)
          next()
        else
          res.status(401).json({status: "no admin"})
      }
    } else {
      console.log('not user config')
      next();
    }
};
module.exports = privateMiddleware
