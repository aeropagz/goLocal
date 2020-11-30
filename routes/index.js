let express = require("express");
let router = express.Router();

let index = require("../controllers/index");
let user = require("./user");
let farmer = require("./farmer")
let transaction = require("./transaction");
let products = require("./products");
let authenticate = require("../middleware/authenticate");
let checkRole = require("../middleware/checkRole");

let authenticate = require("../middleware/authenticate");

//Homepage Routes


router.get("/", [authenticate.authenticateJWT, checkRole.checkRoleCust], index.homepage);
router.get("/login", index.loginpage);

router.get("/register", index.registerpage);
router.get("/registerfarmer", index.registerfarmerpage);
router.get("/farmer", [authenticate.authenticateJWT, checkRole.checkRoleFarmer], index.showFarmer);


router.use("/farmer", farmer);
router.use("/user", user);
router.use("/products", products);
router.use("/transaction", transaction);






module.exports = router;