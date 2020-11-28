homepage = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
}

module.exports = {
    homepage,
}