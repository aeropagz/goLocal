let express = require("express");
let router = express.Router();

let farmer = require("../controllers/farmer")

router.post("/validateLicense", farmer.validateLicense)

module.exports = router;