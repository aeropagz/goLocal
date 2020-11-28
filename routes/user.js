let express = require("express");
let router = express.Router();

let user = require("../controllers/user");
let authenticate = require("../middleware/authenticate");

router.get("/secret", authenticate.authenticateJWT, user.showSecret);
router.get("/login/customer", user.showCustLogin);
router.get("/register/customer", user.showCustRegister);
router.post("/login/customer", user.custLogin);
router.post("/register/customer", user.custRegister);
router.get("/login/farmer", user.showFarmLogin);
router.get("/register/farmer", user.showFarmRegister);
router.post("/login/farmer", user.farmLogin);
router.post("/register/farmer", user.farmRegister);

module.exports = router;