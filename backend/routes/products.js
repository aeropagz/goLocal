let express = require("express");
let router = express.Router();

const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
let products = require("../controllers/products")

router.post('/create', [authenticate.authenticateJWT, checkRole.checkRoleFarmer], products.createProduct);
router.get('/', products.getAllProducts);

module.exports = router;