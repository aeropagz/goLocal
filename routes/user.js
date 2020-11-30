let express = require("express");
let router = express.Router();

let user = require("../controllers/user");
let authenticate = require("../middleware/authenticate");
let checkRole = require("../middleware/checkRole");

router.post("/login", user.login);
router.post("/register/customer", user.custRegister);
router.post("/register/farmer", user.farmRegister);
router.get("/cart", [authenticate.authenticateJWT, checkRole.checkRoleCust], user.getCart);
router.post("/cart", [authenticate.authenticateJWT, checkRole.checkRoleCust], user.addToCart);

module.exports = router;