let checkRoleFarmer = function(req, res, next){
    if (req.user.role ==="farmer"){
        
        next();
    } else {
        res.redirect('/');
    }
}
let checkRoleCust = function(req, res, next){
    if (req.user.role ==="customer"){
        next();
    } else {
        res.redirect('/farmer');
    }
}

module.exports = {
    checkRoleFarmer,
    checkRoleCust
}