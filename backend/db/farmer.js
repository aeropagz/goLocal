let mongoUtil = require("./mongoUtil");
let allDbOperation = require("./products");

validateLicense = async function (name, key) {
    let db = mongoUtil.getDb();
    if (db) {
        try {
            let license = await db.collection("licenseKeys").find({ "id": key, "name": name }).toArray();
            if (license.length == 1) {
                return ({ "result": "positive" });
            } else {
                return ({ "result": "negative" });
            }
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

getAllFarmerWithProduct = async function () {
    const db = mongoUtil.getDb();
    let farmers;
    if (db){
        try{
            farmers = await db.collection("users").find({role: "farmer"}).toArray();
        }
        catch{
            throw error;
        }
        for (farmer of farmers){
            farmer.products = {}
            for (productId of farmer.productIds){
                const product =  await allDbOperation.getProduct(productId);
                farmer.products[productId] = product;
            }
            delete farmer.password;
            delete farmer.licenseKey;
            delete farmer.productIds;
        }
        return farmers
    }
}

module.exports = {
    validateLicense,
    getAllFarmerWithProduct
}