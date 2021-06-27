const userService = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config');

module.exports = () => (req, res, next) => {
    
    req.auth = {
        async register({ email, password, gender }){
            const createUserToken = await registerUser(email, password, gender);
            res.cookie(COOKIE_NAME, createUserToken);
        },
        async login({ email, password }){
            const loggedUserToken = await loginUser(email, password);
            res.cookie(COOKIE_NAME, loggedUserToken);
        },
        logout(){
            res.clearCookie(COOKIE_NAME);
        }
    };
    
    if(readCookie(req, res)){
        next();
    }
}

async function registerUser(email, password, gender) {
    const existing = await userService.getUserByEmail(email);

    if(existing){
        throw new Error('There is already an user with that email!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser(email, hashedPassword, gender);
    return createToken(user);
}

async function loginUser(email, password){
    const user = await userService.getUserByEmail(email);
    
    if(!user){
        throw new Error('No such user!');
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if(isMatch){
        return createToken(user);
    } else {
        throw new Error('Wrong password!');
    }
}

function createToken(userData){
    const userViewModel = {
        _id: userData._id,
        email: userData.email,
        gender: userData.gender
    };

    return jwt.sign(userViewModel, TOKEN_SECRET);
}

function readCookie(req, res){
    const sessionData = req.cookies[COOKIE_NAME];
    if(sessionData){
        try {
            const userData = jwt.verify(sessionData, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }
    }
    return true;
}