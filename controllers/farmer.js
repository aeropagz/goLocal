validateLicense = function (req, res, next) {
    return res.json({ "key": "working" });
}

module.exports = {
    validateLicense,
}