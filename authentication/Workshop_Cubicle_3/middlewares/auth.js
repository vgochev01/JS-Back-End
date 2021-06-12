const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { COOKIE_NAME, TOKEN_SECRET } = require('../config');
const userService = require('../services/user');

module.exports = () => (req, res, next) => {
    req.auth = {
        register,
        login
    };
    
    if(readToken(req)){
        next();
    }

    async function register({ username, password, repeatPassword }){
        if(username == '' || password == ''){
            throw new Error('All fields are required!');
        } else if(password != repeatPassword){
            throw new Error('Passwords don\'t match!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userService.createUser(username, hashedPassword);
        req.user = createToken(user);
    };

    async function login({ username, password }){
        if(username == '' || password == ''){
            throw new Error('All fields are required!');
        }

        const user = await userService.getUserByUsername(username);
        
        if(user){
            const isMatch = await bcrypt.compare(password, user.hashedPassword);
            if(isMatch){
                req.user = createToken(user);
            } else {
                throw new Error('Wrong username or password!');
            }
        } else {
            throw new Error('Wrong username or password!');
        }
    }

    function createToken(user){
        const userViewModel = { _id: user._id, username: user.username };
        const token = jwt.sign(userViewModel, TOKEN_SECRET);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        return userViewModel;
    }

    function readToken(req){
        const token = req.cookies[COOKIE_NAME];
        if(token){
            try {
                const userData = jwt.verify(token, TOKEN_SECRET);
                req.user = userData;
                console.log('Know user', userData.username);
            } catch (err) {
                return false;
            }
        }

        return true;
    }
}