let privateRegex = new RegExp("^\/api\/?(\w+\/?)*")

var apiMiddleware = function(req, res, next) {
  let match = privateRegex.exec(req.path)
  if (match && match != 0) {
    if (!req.user){
      res.status(401).json({})
    } else {
      next()
    }
  } else {
    console.log('not api config')
    next();
  }
};
module.exports = apiMiddleware
