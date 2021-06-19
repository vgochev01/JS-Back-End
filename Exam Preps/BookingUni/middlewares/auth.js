const userService = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config');

module.exports = () => (req, res, next) => {
    
    req.auth = {
        async register({ email, username, password }){
            const createUserToken = await registerUser(email, username, password);
            res.cookie(COOKIE_NAME, createUserToken);
        },
        async login({ username, password }){
            const loggedUserToken = await loginUser(username, password);
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

async function registerUser(email, username, password) {
    const existing = await userService.getUserByUsername(username);

    if(existing){
        throw new Error('Username is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser(email, username, hashedPassword);
    return createToken(user);
}

async function loginUser(username, password){
    const user = await userService.getUserByUsername(username);
    
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
        username: userData.username,
        email: userData.email
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