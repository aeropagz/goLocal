let express = require("express");
let router = express.Router();

let index = require("../controllers/index")
let farmer = require("./farmer")

router.get("/", index.homepage);

router.use("/farmer", farmer);

module.exports = router;
