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

function isOwner(){
    return (req, res, next) => {
        if(req.user){
            const isOwner = req.user._id == req.data.play.owner;
            if(isOwner){
                next();
            } else {
                res.redirect('/plays/details/' + req.params.id);
            }
        } else {
            res.redirect('/auth/login');
        }
    }
}

module.exports = {
    isGuest,
    isAuth,
    isOwner
}