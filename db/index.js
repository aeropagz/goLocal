let farmer = require("./farmer");
let user = require("./user");
let products = require("./products");

console.log(products.createProduct);

module.exports = {
    validateLicense: farmer.validateLicense,
    createUser: user.createUser,
    findUser: user.findUser,
    createProduct: products.createProduct
};