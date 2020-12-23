mongo
use admin
db.createUser(
  {
    user: "myAdmin",
    pwd: "myAdminPassword", // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
use goLocal
db.createUser(
  {
    user: "goLocalAdmin",
    pwd: "goLocalAdminPass", // or cleartext password
    roles: [ { role: "readWrite", db: "goLocal" } ]
  }
)
db.createCollection("users")
db.createCollection("products")
db.createCollection("licenseKeys")
db.createCollection("wishlist")
db.createCollection("transactions")