let express = require("express");
let router = express.Router();

let index = require("../controllers/index")


//Login and Register
router.get("/", index.homepage);
router.get("/login/customer", index.showCustLogin);
router.get("/register/customer", index.showCustRegister);
router.post("/login/customer", index.showCustLogin);
router.post("/register/customer", index.showCustRegister);
router.get("/login/farmer", index.showCustLogin);
router.get("/register/farmer", index.showCustRegister);
router.post("/login/farmer", index.showCustLogin);
router.post("/register/farmer", index.showCustRegister);

//Endpoints for Dummy API for license

//Endpoints for Product API




module.exports = router;