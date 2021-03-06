let express = require("express");
let router = express.Router();

const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
let products = require("../controllers/products")

router.post('/', [authenticate.authenticateJWT, checkRole.checkRoleFarmer], products.createProduct);
router.get('/', products.getAllProducts);
router.get('/cartDetails', [authenticate.authenticateJWT], products.cartDetails);

module.exports = router;