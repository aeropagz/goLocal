exports.homepage = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
}

exports.showLogin = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
}
exports.showRegister = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
}