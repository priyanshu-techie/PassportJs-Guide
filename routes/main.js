const express = require('express');
const router = express.Router();
const passport = require('../config/passport');


router.get('/', (req, res) => {
    res.render('index');
})

router.get('/login', (req, res) => {
    res.render('login');
})

function ensureAuth(req, res, next) {
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

router.get('/protected', setCacheControl, ensureAuth, (req, res) =>{ 
    res.render('protected')
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login'
}));

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


module.exports = router;