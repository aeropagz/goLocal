let farmer = require("./farmer");
let user = require("./user");
let products = require("./products");


module.exports = {
    validateLicense: farmer.validateLicense,
    createUser: user.createUser,
    findUser: user.findUser,
    getCart: user.getCart,
    addToCart: user.addToCart,
    createProduct: products.createProduct,
    getProduct: products.getProduct,
    getAllProducts: products.getAllProducts,
    getProducts: products.getProducts,
    getAllFarmerWithProduct: farmer.getAllFarmerWithProduct,
};