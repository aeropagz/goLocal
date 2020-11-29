let mongoUtil = require("./mongoUtil");


createProduct = function (productObj, callback){
    let db = mongoUtil.getDb();
    if (db) {
        try {
                db.collection("products").insertOne(productObj, callback);
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

getAllProducts = async function () {
    let db = mongoUtil.getDb();
    if (db) {
        try {
            let products = await db.collection("products").find().toArray();
            return products;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

module.exports = {
    createProduct,
    getAllProducts
};