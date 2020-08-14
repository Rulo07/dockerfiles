let User = require("../database/schemas/user");
let db = require('../database/db');
let bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

class UserManager {
  static createAdmin(user, password) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
      // hash the password using our new salt
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return next(err);

        let userAdmin = new User(user, hash);
        db.query(userAdmin.getAddAdmin(), (err, data)=> {
            if(!err){
              console.log("All settings created")
            }
            else{
              console.log("All settings was created")
            }
        });
      });
    });
  }
  static isAdmin(user) {
    return new Promise((resolve, reject) => {
      db.query(User.isAdmin(user), (err, data)=> {
        if(data[0].admin == 1)
          resolve(true)
        else
          resolve(false)
      });
    })
  }
}
module.exports = UserManager
