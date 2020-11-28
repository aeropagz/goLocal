let express = require("express");
let router = express.Router();

let index = require("../controllers/index")

router.get("/", index.homepage);

module.exports = router;
