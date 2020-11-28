const path = require("path")

homepage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
}

loginpage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/login.html"));
}

regiterpage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/register.html"));
}

module.exports = {
    homepage, loginpage
}