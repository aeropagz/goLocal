let express = require("express");
let router = express.Router();

let user = require("../controllers/user");
let authenticate = require("../middleware/authenticate");

router.post("/login", user.login);
router.post("/register/customer", user.custRegister);
router.post("/register/farmer", user.farmRegister);
router.get("/cart", user.getCart);
module.exports = router;