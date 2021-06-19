function isGuest() {
    return (req, res, next) => {
        if(req.user == undefined){
          return next();
        }
        res.redirect('/');
    }
}

function isAuth() {
    return (req, res, next) => {
        if(req.user != undefined){
            return next();
        }
        res.redirect('/auth/login');
    }
}

module.exports = {
    isGuest,
    isAuth
}