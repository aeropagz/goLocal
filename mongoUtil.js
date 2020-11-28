const MongoClient = require("mongodb").MongoClient;
let host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
let port = process.env.DB_PORT ? process.env.DB_PORT : "27017";
let dbName = process.env.DB_NAME ? process.env.DB_NAME : "goLocal";

// Connection URL
const url = "mongodb://" + host + ":" + port + "/" + dbName;
let _db;

async function connectToServer() {
  try {
    if (_db) {
      return _db;
    }
    console.log("Trying to connect to Database");
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    _db = client.db(dbName);
    console.log("DataBase connected.");
    return _db;
  } catch (err) {
    console.log("DataBase connection failed." + err);
    return err;
  }
}

const getDb = () => {
  return _db;
};

const getMongoConfig = () => {
  return { host, port, dbName, collectionName };
};

module.exports = {
  connectToServer,
  getDb,
  getMongoConfig
};
