let express = require("express");
let router = express.Router();

let products = require("../controllers/products");

router.get('/', products.getProduct);

module.exports = router;