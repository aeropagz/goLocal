let mongoUtil = require("./mongoUtil");


createUser = function (userObj, callback){
    let db = mongoUtil.getDb();
    if (db) {
        console.log("db :" + db);
        try {
                db.collection("users").insertOne(userObj, callback)
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

findUser = async function (username, password) {
    let db = mongoUtil.getDb();
    if (db) {
        console.log(username, password);
        try {
            let user = await db.collection("users").find({ "username": username}).toArray();
            console.log("result : " + JSON.stringify(user));
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

module.exports= {
    createUser,
    findUser
}