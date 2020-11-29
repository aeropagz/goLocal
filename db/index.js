let farmer = require("./farmer");
let user = require("./user");
let products = require("./products");


module.exports = {
    validateLicense: farmer.validateLicense,
    createUser: user.createUser,
    findUser: user.findUser,
    createProduct: products.createProduct,
    getAllProducts: products.getAllProducts,
    getCart: user.getCart,
    addToCart: user.addToCart
};