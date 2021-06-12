const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');

module.exports = () => (req, res, next) => {
    req.auth = {
        register,
        login
    };

    next();

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
        const token = jwt.sign(userViewModel, 'my very secure secret');
        res.cookie('SESSION_DATA', token, { httpOnly: true });

        return userViewModel;
    }
}