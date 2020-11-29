let checkRoleFarmer = function(req, res, next){
    if (req.user.role ==="farmer"){
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    checkRoleFarmer
}