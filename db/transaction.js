let mongoUtil = require("./mongoUtil");

createTransaction = async function (transactionObj){
    let db = mongoUtil.getDb();
    if (db) {
        try {
                await db.collection("transaction").insertOne(transactionObj);
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

module.exports = {
    createTransaction,
}