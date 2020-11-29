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

module.exports = {
    createProduct,
};