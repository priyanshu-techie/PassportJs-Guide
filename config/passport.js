const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Users } = require('./database');
const  { genPassword,validatePassword }  = require('../utils/passportUtils');

// setting up passport


passport.use(new LocalStrategy(async function verify(username, password, callback) {
    // console.log("entered verify ");
    try {
      const user = await Users.findOne({ name: username });
      // if no user
      if (!user) { return callback(null, false) } // (no error, no user);
      // user found then validate password
      const isValid = validatePassword(password, user.salt, user.password);

      if (isValid) {
        // console.log("user found");
        return callback(null, user);
      }
      else {
        // console.log("user not found");
        return callback(null, false);
      }
    }
    catch (e) {
      return callback(e);
    }
  }));
  // the callback function above looks like this :
      // function verified(err, user, info) {
      //   if (err) { return self.error(err); }
      //   if (!user) { return self.fail(info); }
      //   self.success(user, info);
      // }

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  


  module.exports=passport;