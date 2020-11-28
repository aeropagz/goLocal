validateLicense = function (key) {
    if (key == "1") {
        return ({ "result": "valid" });
    }
    return ({ "result": "not valid" })
}

module.exports = {
    validateLicense,
}