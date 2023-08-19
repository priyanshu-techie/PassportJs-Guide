const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Users } = require('./database');
const  { validatePassword }  = require('../utils/passportUtils');

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

        // if user is valid then we are plugging in the user to the passport middleware, 
        // this 'user' is then used by the serialsizeUser function to plug user info in the req object
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
      // this object is 👇👇 plugged to the req object 
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  //  "serializeUser" refers to the process of converting a user object into a format that
  // can be stored in the session. This typically involves extracting a unique identifier 
  //or key from the user object, such as the user ID, and serializing it into a format that
  // can be easily stored and retrieved. The serialized user data is then stored in the 
  // session store, allowing the application to identify the user in subsequent requests.

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  
  //"deserializeUser" refers to the process of reconstructing the user object from the
  // serialized data stored in the session. It involves taking the serialized identifier,
  // such as the user ID, and using it to retrieve the corresponding user object from a
  // database or any other data source. Once the user object is reconstructed, it is made
  // available to the application, typically by attaching it to the request object,
  // allowing the application to access and utilize the user's information during the 
  // request handling process.


  module.exports=passport;