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
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let reqName = req.body.name;
    let reqLicense = req.body.license;
    let reqLocation = req.body.location;
    let reqPayment = req.body.payment;

    let result = await db.validateLicense(reqName, reqLicense);
    if (result['result'] === "positive") {
        bcrypt.hash(reqPassword, saltRounds, function (err, hash) {
            let user = {
                id: uuid.v4(),
                name: reqName,
                password: hash,
                role: "farmer",
                username: reqUsername,
                "license-key": reqLicense,
                location: reqLocation,
                "payment_method": reqPayment,
            };
            db.createUser(user, function (err, result) {
                if (err) throw err;
                let jwtPayload = {
                    "id": user.id,
                    "name": user.name,
                    "role": user.role,
                    "location": user.location,
                }
                let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
                res.cookie('myToken', token);
                res.status(201).json({"result":"success"});
            });

        });
    } else{
        res.sendStatus(500);
    }


}


custRegister = function (req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let reqName = req.body.name;

    bcrypt.hash(reqPassword, saltRounds, function (err, hash) {
        let user = {
            id: uuid.v4(),
            name: reqName,
            password: hash,
            role: "customer",
            username: reqUsername,
            cart: []
        };
        db.createUser(user, function (err, result) {
            if (err) throw err;
            let jwtPayload = {
                "id": user.id,
                "name": user.name,
                "role": user.role,
            }
            let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
            res.cookie('myToken', token);
            res.status(201).json({"result":"succes"});

        });
    });
}

login = async function (req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    let user = await db.findUser(reqUsername);
    user = user[0];
    if(user){
        bcrypt.compare(reqPassword, user.password, function (err, result){
            if (result === true){
                    let jwtPayload = {
                        "id": user.id,
                        "name": user.name,
                        "role": user.role,
                    }
                    let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
                    res.cookie('myToken', token);
                    res.status(202).redirect('/');
            } else{
                res.redirect('/login');
            }
        });
    } else{
        res.redirect("/login");
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
    let pushed = false;
    cart.array.forEach(element => {
        if (element['id'] === reqCartItem['id']){
            element['quantity'] += reqCartItem['id']
            pushed = true;
        }
    });
    if(pushed === false){
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