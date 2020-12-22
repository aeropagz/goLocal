let mongoUtil = require("./mongoUtil");


createProduct = async function (productObj) {
    let db = mongoUtil.getDb();
    if (db) {
        try {
            await db.collection("products").insertOne(productObj);
            await db.collection("users").updateOne({ "id": productObj.farmerID}, {$push:{productIds: productObj.id}});
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
            let products = await db.collection("products").aggregate([
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "farmerID",
                        foreignField: "id",
                        as: "farmer"
                    }
                },
                {
                    $unwind: "$farmer"
                },
                {
                    $project: {
                        "farmer.password": 0
                    }
                }
            ]).toArray();
            return products;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}


getProducts = async function (productIDs) {
    let db = mongoUtil.getDb();
    if (db) {
        try {
            let products = await db.collection("products").find({"id": {"$in": productIDs}}).toArray();
            return products;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}


getProduct = async function (productId) {
    let db = mongoUtil.getDb();
    if (db) {
        try {
            let product = await db.collection("products").findOne({ "id": productId });
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    getProducts
};