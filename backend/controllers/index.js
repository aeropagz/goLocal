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

cart = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/cart.html"));
}



module.exports = {
    homepage,
    loginpage,
    registerpage,
    registerfarmerpage,
    cart
}