let path = require('path');
let bcrypt = require('bcrypt');
let fs = require('fs');
let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
let process = require('process');
dotenv.config();

const saltRounds = 1;

showCustLogin = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/custLogin.html"));
}
showCustRegister = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/custRegister.html"));
}
showFarmLogin = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/farmLogin.html"));
}
showFarmRegister = function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/user/farmRegister.html"));
}


farmLogin = function(req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    fs.readFile("db/" + reqUsername +".json", 'utf-8', function(err, data){
        if(err){
            console.log(err);
            res.redirect('/user/farmer/login');
        }
        let user = JSON.parse(data);

        bcrypt.compare(reqPassword, user.password, function (err, result){
            if (err) throw err;
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
                res.redirect('/user/farmer/login');
            }
        });
});
}


farmRegister = function(req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let reqName = req.body.name;

    bcrypt.hash(reqPassword, saltRounds, function (err, hash){
        let user = {
            id: Math.random().toString(36).substr(2, 9),
            name: reqName,
            password: hash,
            role: "customer",
            username: reqUsername,
            cart: []
            
        };
        let json = JSON.stringify(user, null, 2);
        console.log(json);
        fs.writeFile("db/" + reqUsername + ".json", json, 'utf-8', function(error){
            if (error) throw error;
            let jwtPayload = {
                "id": user.id,
                "name": reqName,
                "role": "customer",
            };
            let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
            res.cookie('myToken', token);
            res.redirect('/user/register/farmer');

        });

    });


}


custLogin = function(req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    fs.readFile("db/" + reqUsername +".json", 'utf-8', function(err, data){
        if(err){
            console.log(err);
            res.redirect('/user/farmer/login');
        }
        let user = JSON.parse(data);

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
            res.redirect('/user/farmer/login');
        }
        });
});
}


custRegister = function(req, res, next) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let reqName = req.body.name;

    let hashPassword = bcrypt.hash(reqPassword, saltRounds, function (err, hash){
        let user = {
            id: Math.random().toString(36).substr(2, 9),
            name: reqName,
            password: hash,
            role: "customer",
            username: reqUsername,
            cart: []
            
        };
        let json = JSON.stringify(user, null, 2);
        console.log(json);
        fs.writeFile("db/" + reqName + ".json", json, 'utf-8', function(error){
            if (error) throw error;
            let jwtPayload = {
                "id": user.id,
                "name": reqName,
                "role": "customer",
            };
            let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
            res.cookie('myToken', token);
            res.redirect('/user/register/farmer');

        });

    });

}


showSecret = function(req, res, next){
    res.sendFile(path.join(__dirname + "/../public/secret.html"));
}


module.exports = {
    showCustLogin,
    showCustRegister,
    showFarmLogin,
    showFarmRegister,
    farmLogin,
    farmRegister,
    custLogin,
    custRegister,
    showSecret    
}