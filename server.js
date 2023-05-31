const express = require('express')
const app = express();
const passport = require('./config/passport');
const { connect } = require('./config/database');
const session = require('express-session');
const mainRoutes=require('./routes/main')
const MongoStore = require('connect-mongo');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connect();
app.use(passport.initialize());

// setting passport session

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create( { mongoUrl:'mongodb://localhost:27017/learningPassport'})
}));
app.use(passport.authenticate('session'));

//routes
app.use('/',mainRoutes);

app.listen(8000, () => {
  console.log("running at http://localhost:8000 ");
})
