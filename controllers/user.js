let path = require('path');
let bcrypt = require('bcrypt');
let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
let process = require('process');
let uuid = require('uuid');

let db = require("../db/index");


dotenv.config();

const saltRounds = 1;

showLogin = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/login.html"));
}
showCustRegister = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/custRegister.html"));
}

showFarmRegister = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/farmRegister.html"));
}


farmRegister = async function (req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let reqName = req.body.name;
    let reqLicense = req.body.license;
    let reqLocation = req.body.location;
    let reqPayment = req.body.payment;

    let result = await db.validateLicense(reqName, reqLicense);
    console.log(result);
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
                res.status(201).json({"result":"succes"});
            });

        });
    } else
        res.sendStatus(500);



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
    console.log(reqUsername, reqPassword);
    console.log(req.body);

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
                res.redirect(304, '/user/login');
            }
        });
    } else{
        res.redirect(305, "/user/login");
    }
}

showSecret = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/secret.html"));
}


module.exports = {
    showCustRegister,
    showLogin,
    showFarmRegister,
    farmRegister,
    custRegister,
    login,
    showSecret
}