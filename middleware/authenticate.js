let cookieParser = require('cookie-parser');
let jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const myToken = req.cookies['myToken'];

    if (myToken) {
       
        jwt.verify(myToken, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.redirect('/login');
            }

            req.user = user;
            next();
        });
    } else {
        res.redirect('/login');
    }
};

module.exports={
    authenticateJWT
};