const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const controllers=require('../controllers/mainControllers');

router.get('/', controllers.getIndex);

function isAuthenticated(req,res,next){
    // this is a middleware to be put in login && signUp page
    // if user tries to go to the url of login or signUp, take them to the home page.
    if (req.isAuthenticated()) {
        res.redirect('/protected');
    }
    else{
        next();
    }
}

router.get('/login',isAuthenticated,controllers.getLoginPage)

function ensureAuth(req, res, next) {
    // this isAuthenticated() function is provided by passport
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function setCacheControl(req, res, next) {
    res.setHeader('Cache-Control', 'no-store');
    next();
}

// By setting the Cache-Control header to 'no-store', you instruct the browser not to cache the protected page, so even if the user goes back in their browser history, the page will be requested from the server again.

router.get('/protected', setCacheControl, ensureAuth, controllers.getProtectedPage);

router.get('/signup',isAuthenticated ,controllers.getSignUpPage );

router.post('/login',controllers.login , passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect:'/login'
}));

router.post('/logout', controllers.logout);

router.post('/signup',setCacheControl ,controllers.signUp)


module.exports = router;