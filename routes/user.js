let express = require("express");
let router = express.Router();

let user = require("../controllers/user");
let authenticate = require("../middleware/authenticate");

router.get("/secret", authenticate.authenticateJWT, user.showSecret);
router.get("/login", user.showLogin);
router.get("/register/customer", user.showCustRegister);
router.get("/register/farmer", user.showFarmRegister);
router.post("/register/customer", user.custRegister);
router.post("/register/farmer", user.farmRegister);
router.post("/login", user.login);

module.exports = router;