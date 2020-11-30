let express = require("express");
let router = express.Router();

let transaction = require("../controllers/transaction");
let authenticate = require("../middleware/authenticate");
let checkRole = require("../middleware/checkRole");

router.post('/', [authenticate.authenticateJWT, checkRole.checkRoleCust], transaction.performTrans);

module.exports = router;