let farmer = require("./farmer");
let user = require("./user");
let products = require("./products");
let transaction = require("./transaction");


module.exports = {
    validateLicense: farmer.validateLicense,
    createUser: user.createUser,
    findUser: user.findUser,
    createProduct: products.createProduct,
    getProduct: products.getProduct,
    getAllProducts: products.getAllProducts,
    getCart: user.getCart,
    addToCart: user.addToCart,
    createTransaction: transaction.createTransaction
};