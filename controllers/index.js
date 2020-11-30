const path = require("path")
let db = require("../db/index");


homepage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
}

loginpage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/login.html"));
}

registerpage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/register.html"));
}

registerfarmerpage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/registerfarmer.html"));
}
showFarmer = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/product.html"));
}

showCart = async function (req, res, next) {
    let cart = db.getCart;
}

module.exports = {
    homepage,
    loginpage,
    registerpage,
    registerfarmerpage,
    showFarmer
}