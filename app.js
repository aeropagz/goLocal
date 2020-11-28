const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
let path = require("path");
let router = require("./routes/index");
let mongoUtil = require("./db/mongoUtil");

// Destructure our bodyParser methods
const { urlencoded, json } = bodyParser;

const port = process.env.PORT || 8080;
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

//Connect to DataBase
mongoUtil.connectToServer();

//Static data to be exposed
app.use(express.static(__dirname + "/public"));

app.use("/", router);

app.listen(port, () => {
  console.log("Server started at port :" + port);
});
