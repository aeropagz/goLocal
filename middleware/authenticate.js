let cookieParser = require('cookie-parser');
let jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const myToken = req.cookies['myToken'];
    console.log(myToken);

    if (myToken) {
       
        jwt.verify(myToken, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports={
    authenticateJWT
};