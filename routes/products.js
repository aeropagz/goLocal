let express = require("express");
let router = express.Router();

let products = require("../controllers/products");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");

router.get('/', products.getProducts);
router.get('/create', [authenticate.authenticateJWT, checkRole.checkRoleFarmer], products.createProduct);

module.exports = router;