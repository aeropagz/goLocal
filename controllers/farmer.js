let db = require("../db/index")

validateLicense = function (req, res, next) {
    result = db.validateLicense("1");
    return res.json(result);
}

module.exports = {
    validateLicense,
}