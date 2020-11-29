let db = require("../db/index");


getProducts = function(req, res, next){
    res.send();   
}

createProduct = function(req, res, next){
    let reqName = req.body.name;
    let reqDescribtion = req.body.describtion;
    let reqPrice = req.body.price;
    let reqManufactureDate = req.body.manufactureDate;
    let reqExpiryDate = req.body.expiryDate;
    let reqDeliveryMethod = req.body.deliveryMethod;
    let reqPaymentMethod = req.body.paymentMethod;

    let productObj = {
        name: reqName,
        describtion: reqDescribtion,
        farmerID: null,
    }
}


module.exports = {
    getProducts,
    createProduct
};