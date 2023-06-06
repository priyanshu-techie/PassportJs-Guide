const  { validatePassword,genPassword }  = require('../utils/passportUtils');
const { Users } = require('../config/database');

module.exports={
    getIndex:(req, res) => {
        res.render('index');
    },
    getLoginPage:(req, res) => {
        res.render('login');
    },
    getProtectedPage:(req, res) =>{ 
        console.log(req);
        res.render('protected')
    },
    getSignUpPage:function(req, res, next) {
        res.render('signup',{err:false});
    },

    login:async (req,res,next)=>{
        try{
            // i could also have used res.render instead of flash, but lets learn something new 
            const user=await Users.find({ name:req.body.username });
            //if user not found
            if(!user.length){
                req.flash('errors',"Username incorrect, or user doesn't exists");
                return res.redirect('/login');
            }
            // if password incorrect
            if(!validatePassword(req.body.password,user[0].salt,user[0].password)){
                req.flash('errors',"Password incorrect!");
                return res.redirect('/login');
            }

            next();
        }
        catch(e){
            console.log(e);
            res.redirect('/login');
        }

    },

    logout:function (req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    },
    signUp:async (req,res)=>{
        // here i have used res.render instead of flash

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