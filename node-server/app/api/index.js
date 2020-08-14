//Require all your middlewares here
var privateMiddleware = require('../middlewares/private')
var authorizationMiddleware = require('../middlewares/auth')
var apiMiddleware = require('../middlewares/api')
//Require all your routes here
let userRoutes = require('./user')
let apiRoutes = require('./api')
function router(app) {
  app.use(authorizationMiddleware)
  app.use(privateMiddleware)
  app.use(apiMiddleware)
  userRoutes(app)
  apiRoutes(app)
}
module.exports = router
