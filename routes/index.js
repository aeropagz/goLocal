let express = require("express");
let router = express.Router();

let index = require("../controllers/index");
let user = require("./user");
let farmer = require("./farmer")
let products = require("./products")

let authenticate = require("../middleware/authenticate");

//Homepage Routes
router.get("/", authenticate.authenticateJWT, index.homepage);
router.get("/login", index.loginpage);
router.get("/register", index.registerpage);
router.get("/registerfarmer", index.registerfarmerpage);


router.use("/farmer", farmer);
router.use("/user", user);
router.use("/products", products);





module.exports = router;