const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mainRoutes = require("./routes/main");

require("dotenv").config({ path: "./config/.env" });

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}!`);
});
