let db = require("../db/index")

validateLicense = async function (req, res, next) {
    if (!req.body || !req.body.data || !req.body.data.key || !req.body.data.name) {
        return res.status(400).send("Proper data should be provided.")
    }
    result = await db.validateLicense(req.body.data.name, req.body.data.key);
    return res.json(result);
}

module.exports = {
    validateLicense,
}