let db = require("../db/index");
let uuid = require('uuid');


performTrans = async function(req, res, next) {
    let reqUserID = req.user.id;
    let cart = await db.getCart(reqUserID);
    let products = [];
    cart.array.forEach(element => {
    });
}

module.exports= {
    performTrans
} 
    