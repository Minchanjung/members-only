var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");

const User = require("./models/User");
const Message = require("./models/Message");

var app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(
  new LocalStrategy(async(email, password, done) => {
    console.log(email);
    console.log(password);
    console.log('checking pass')
    try {
      const user = await User.findOne({ email: email});
      console.log(user);
      if (!user) {
        return done(null, false, { message: "incorrect email" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user )
    } catch(err) {
      return done(err);
    }
  })
)

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/", signupRouter)
app.post('/login', passport.authenticate("local", { 
  successRedirect: "/", 
  failureRedirect: "/signup", 
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
