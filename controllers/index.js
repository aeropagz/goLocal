const path = require("path")

homepage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
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

module.exports = {
    homepage, loginpage, registerpage, registerfarmerpage
}