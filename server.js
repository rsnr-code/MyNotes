const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const connectDB = require('./config/db');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mainRoutes = require("./routes/main");
const noteRoutes = require("./routes/notes");


require("dotenv").config({ path: "./config/.env" });

require('./config/passport')(passport);

connectDB();
app.use(logger('dev'))

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
      }),
    })
  )

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use("/", mainRoutes);
app.use("/notes", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}!`);
});
