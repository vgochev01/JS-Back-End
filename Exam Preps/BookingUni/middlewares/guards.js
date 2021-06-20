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
            const isOwner = req.user._id == req.data.hotel.owner._id;
            if(isOwner){
                next();
            } else {
                res.redirect('/hotels/' + req.params.id);
            }
        } else {
            res.redirect('/auth/login');
        }
    }
}

function notOwner(){
    return (req, res, next) => {
        if(req.user){
            const isOwner = req.user._id == req.data.hotel.owner._id;
            if(isOwner){
                res.redirect('/hotels/' + req.params.id);
            } else {
                next();
            }
        } else {
            res.redirect('/auth/login');
        }
    }
}

module.exports = {
    isGuest,
    isAuth,
    isOwner,
    notOwner
}