let mongoUtil = require("./mongoUtil")

validateLicense = async function (name, key) {
    let db = mongoUtil.getDb();
    if (db) {
        console.log("db :" + db);
        try {
            let license = await db.collection("licenseKeys").find({ "id": key, "name": name }).toArray();
            console.log("result : " + JSON.stringify(license));
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

module.exports = {
    validateLicense,
}