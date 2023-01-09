const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

const sequelize = require("./database");
const app = express();
const expenseRoute = require("./route/expense");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expenseRoute);

sequelize
  .sync()
  .then((res) => {
    app.listen(2000);
    console.log("server is running");
  })
  .catch((err) => {
    console.log(err);
  });
