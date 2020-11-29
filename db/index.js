let farmer = require("./farmer");
let user = require("./user");

module.exports = {
    validateLicense: farmer.validateLicense,
    createUser: user.createUser,
    findUser: user.findUser
};