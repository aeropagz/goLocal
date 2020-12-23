let path = require('path');
let bcrypt = require('bcrypt');
let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
let process = require('process');
let uuid = require('uuid');

let db = require("../db/index");

dotenv.config();

const saltRounds = 1;


farmRegister = async function (req, res, next) {
    let reqEmail = req.body.email;
    let reqPassword = req.body.password;
    let reqName = req.body.name;
    let reqLicense = req.body.license;
    let reqLocation = req.body.location;

    let result = await db.validateLicense(reqName, reqLicense);
    if (result["result"] === "positive") {
        let hash = await bcrypt.hash(reqPassword, saltRounds)
        let user = {
            id: uuid.v4(),
            name: reqName,
            password: hash,
            role: "farmer",
            email: reqEmail,
            licenseKey: reqLicense,
            location: reqLocation,
            productIds: []
        };
        await db.createUser(user);
        res.json({"result": "success"});
    } else {
        res.status(401).send("License or Name not valid");
    }


}


custRegister =  async function (req, res, next) {
    let reqEmail = req.body.email;
    let reqPassword = req.body.password;
    let reqName = req.body.name;

    let hash = await bcrypt.hash(reqPassword, saltRounds) 
    let user = {
        id: uuid.v4(),
        name: reqName,
        password: hash,
        role: "customer",
        email: reqEmail,
        cart: []
    };
    await db.createUser(user)
    res.json({"result": "success"});
}

login = async function (req, res, next) {
    let reqEmail = req.body.username;
    let reqPassword = req.body.password;

    let user = await db.findUser(reqEmail);
    
    if(user && await bcrypt.compare(reqPassword, user.password)){
        let jwtPayload = {
            "id": user.id,
            "name": user.name,
            "role": user.role,
        }
        let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
        res.json({"id": user.id,
                "name": user.name,
                "role": user.role,
                "token": token});
    } else{
        res.status(401).send('Wrong password or username');
    }
}

getCart = async function(req, res, next){
    let userID = getUserID(req.cookies);
    let cart = await db.getCart(userID);
    res.json(cart);
}

addToCart = async function(req, res, next){
    let userID = getUserID(req.cookies);
    let cart = await db.getCart(userID);
    let reqCartItem = req.body.cartItem
    let itemAdded = false;
    cart.array.forEach(element => {
        if (element['id'] === reqCartItem['id']){
            element['quantity'] += parseInt(reqCartItem['quantity']);
            itemAdded = true;
        }
    });
    if(itemAdded === false){
        cart.push(reqCartItem);
    }
    let result = await db.addToCart(userID, cartItem);
    res.json([result, cart]);
}

getUserID = function(cookies){
    return JSON.parse(Buffer.from(cookies['myToken'].split('.')[1], 'base64').toString())['id'];
}


module.exports = {
    farmRegister,
    custRegister,
    login,
    getCart,
    addToCart
}