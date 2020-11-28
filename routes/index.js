let express = require("express");
let router = express.Router();

let index = require("../controllers/index");
let user = require("../controllers/user");
let farmer = require("./farmer")

//Homepage Routes
router.get("/", index.homepage);
router.use("/farmer", farmer);



//Login and Register Endpoints
router.get("/login/customer", user.showCustLogin);
router.get("/register/customer", user.showCustRegister);
router.post("/login/customer", user.showCustLogin);
router.post("/register/customer", user.showCustRegister);
router.get("/login/farmer", user.showCustLogin);
router.get("/register/farmer", user.showCustRegister);
router.post("/login/farmer", user.showCustLogin);
router.post("/register/farmer", user.showCustRegister);

//Endpoints for Dummy API for license

//Endpoints for Product API




module.exports = router;