let path = require('path');
let bcrypt = require('bcrypt');
let fs = require('fs');
let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
let process = require('process');
let uuid = require('uuid');

let db = require("../db/index");
const { createCustomer, findUser } = require('../db/user');
const { validateLicense } = require('../db/farmer');


dotenv.config();

const saltRounds = 1;

showLogin = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/login.html"));
}
showCustRegister = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/custRegister.html"));
}

showFarmRegister = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/farmRegister.html"));
}


farmRegister =  async function(req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let reqName = req.body.name;
    let reqLicense = req.body.license;
    let reqLocation = req.body.location;
    let reqPayment = req.body.payment;
    
    let result = await validateLicense(reqName, reqLicense);
    console.log(result);
    if (result['result'] === "positive"){
        bcrypt.hash(reqPassword, saltRounds, function (err, hash){
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
            createUser(user, function(err, result){
                if(err) throw err;
                let jwtPayload = {
                    "id": user.id,
                    "name": user.name,
                    "role": user.role,
                    "location": user.location,
                }
                let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
                res.cookie('myToken', token);
                res.redirect('/');
            });
    
        });
    } else
    res.redirect('/user/register/farmer');
    


}


custRegister = function(req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let reqName = req.body.name;
    
    let hashPassword = bcrypt.hash(reqPassword, saltRounds, function (err, hash){
        let user = {
            id: uuid.v4(),
            name: reqName,
            password: hash,
            role: "customer",
            username: reqUsername,
            cart: []
        };
        createCustomer(user, function(err, result){
            if(err) throw err;
            let jwtPayload = {
                "id": user.id,
                "name": user.name,
                "role": user.role,
            }
            let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
            res.cookie('myToken', token);
            res.redirect('/');
        });
    });
}

login = async function(req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    let user = await findUser(reqUsername, reqPassword);
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
                    res.redirect('/');
            } else{
                res.redirect('/user/login');
            }
        });
    } else{
        res.redirect("/user/login");
    }
}

showSecret = function(req, res, next){
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