let db = require("../db/index");

validateLicense = async function (req, res, next) {
    if (!req.body || !req.body || !req.body.key || !req.body.name) {
        return res.status(400).send("Proper data should be provided.")
    }
    result = await db.validateLicense(req.body.name, req.body.key);
    return res.json(result);
}

module.exports = {
    validateLicense,
}