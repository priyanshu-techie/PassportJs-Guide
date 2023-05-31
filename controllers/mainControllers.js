const  { genPassword }  = require('../utils/passportUtils');
const { Users } = require('../config/database');

module.exports={
    getIndex:(req, res) => {
        res.render('index');
    },
    getLoginPage:(req, res) => {
        res.render('login');
    },
    getProtectedPage:(req, res) =>{ 
        res.render('protected')
    },
    getSignUpPage:function(req, res, next) {
        res.render('signup',{err:false});
    },
    logout:function (req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    },
    signUp:async (req,res)=>{
        //if pass!=cnfrmpass
        if(req.body.password!==req.body.confirmPassword){
            return res.render('signup',{err:true,msg:"Password and Confirm Password do not match!"})
        }
        // if(user already exist)
        const user=await Users.find({name:req.body.username});
        if(user.length!=0){
            return res.render('signup',{err:true,msg:"User already exists! Try another name or Login if have an account. "})
        }

        const passDetails= genPassword(req.body.password);
        const newUser=await Users.collection.insertOne({name:req.body.username, password:passDetails.hash, salt:passDetails.salt});
        req.login(newUser, function(err) {
            if (err) { return next(err); }
            res.redirect('/protected');
          });
    }
}