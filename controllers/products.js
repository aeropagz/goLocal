let db = require("../db/index");
let uuid = require('uuid');


createProduct = function(req, res, next){
    let reqName = req.body.name;
    let reqDescribtion = req.body.describtion;
    let reqPrice = req.body.price;
    let reqManufactureDate = req.body.manufactureDate;
    let reqExpiryDate = req.body.expiryDate;
    let reqDeliveryMethod = req.body.deliveryMethod;
    let reqPaymentMethod = req.body.paymentMethod;
    let farmerID = req.user.id;
    console.log("DB",db);

    let productObj = {
        id: uuid.v4(),
        name: reqName,
        describtion: reqDescribtion,
        farmerID: farmerID,
        price: reqPrice,
        "mfg-date": reqManufactureDate,
        "exp-date": reqExpiryDate,
        "delivery-method": reqDeliveryMethod,
        "payment-methond": reqPaymentMethod
    }
    // db.createProduct();
    // console.log(db.createProduct);
    db.createProduct(productObj, function(err, result){
        if (err) throw err;
        res.json({"result": "success"})
    });
}

module.exports = {
    createProduct
}