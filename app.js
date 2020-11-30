const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
let path = require("path");
let cookieParser = require('cookie-parser');

let router = require("./routes/index");
let mongoUtil = require("./db/mongoUtil");

// Destructure our bodyParser methods
const { urlencoded, json } = bodyParser;


const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//Connect to DataBase
mongoUtil.connectToServer();

//Static data to be exposed
app.use(express.static(__dirname + "/public"));

app.use("/", router);

module.exports = app;