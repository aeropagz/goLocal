let db = require("../db/index");


getProducts = function(req, res, next){
    res.send();   
}

createProduct = function(req, res, next){
    let reqName = req.body.name;
}


module.exports = {
    getProducts,
    createProduct
};