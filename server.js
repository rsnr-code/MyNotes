const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mainRoutes = require("./routes/main");
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require("dotenv").config({ path: "./config/.env" });

connectDB();
app.use(logger('dev'))

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

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

app.use(flash())

app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}!`);
});
