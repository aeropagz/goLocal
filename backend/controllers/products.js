let db = require("../db/index");
let uuid = require('uuid');
const { getRounds } = require("bcrypt");


createProduct = async function (req, res, next) {

    let reqName = req.body.name;
    let reqDescription = req.body.description;
    let reqQuantity = Math.abs(parseInt(req.body.quantity));
    let reqPrice = Math.abs(parseInt(req.body.price));
    let reqManufactureDate = req.body.manufactureDate;
    let reqExpiryDate = req.body.expiryDate;
    let reqDeliveryMethod = req.body.deliveryOptions;
    let reqPaymentMethod = req.body.paymentOptions;
    let farmerID = req.user.id;

    let productObj = {
        id: uuid.v4(),
        name: reqName,
        description: reqDescription,
        quantity: reqQuantity,
        farmerID: farmerID,
        price: reqPrice,
        manufactureDate: reqManufactureDate,
        expiryDate: reqExpiryDate,
        deliveryOptions: reqDeliveryMethod,
        paymentOptions: reqPaymentMethod
    }
    try {
        await db.createProduct(productObj);
        res.json({"result": "success"});
    }catch {
        res.json({"result": "failed"});
    }
}

updateProductQuantity = async function (productName, farmerID, quantity) {
    await db.collection("users").updateOne({ "farmerID": farmerID, "name": productName }, { $inc: { "quantity": quantity } });
}

getAllProducts = async function (req, res, next) {
    let products = await db.getAllProducts();
    res.json({ "products": products });
}

cartDetails = async function (req, res, next) {
    let user = req.user;
    let prodIDs = []
    for (let i = 0; i < user["cart"].length; i++) {
        prodIDs.push(user["cart"][i]["productID"])
    }
    let products = await db.cartDetails(prodIDs);
    return res.json({ "products": products, "cart": user["cart"] });
}

module.exports = {
    createProduct,
    getAllProducts,
    cartDetails
}