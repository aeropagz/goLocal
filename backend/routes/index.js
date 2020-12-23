let express = require("express");
let router = express.Router();

let index = require("../controllers/index");
let user = require("./user");
let farmer = require("./farmer")
let products = require("./products");


router.use("/farmer", farmer);
router.use("/user", user);
router.use("/products", products);






module.exports = router;