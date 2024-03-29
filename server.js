const express = require('express')
const app = express();
const passport = require('./config/passport');
const { connect } = require('./config/database');
const session = require('express-session');
const mainRoutes=require('./routes/main')
const flash=require('express-flash');
const MongoStore = require('connect-mongo');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connect();
app.use(flash());
app.use(passport.initialize());

// setting express session

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create( { mongoUrl:'mongodb://localhost:27017/learningPassport'})
}));
// setting passport session
app.use(passport.authenticate('session'));

//routes
app.use('/',mainRoutes);

app.listen(8000, () => {
  console.log("running at http://localhost:8000 ");
})
