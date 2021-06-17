const bcrypt = require('bcrypt');

const users = {};

module.exports = (req, res, next) => {
    req.auth = {
        async register(username, password){
            const id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
    
            const hashedPass = await bcrypt.hash(password, 8);
        
            users[id] = {
                username,
                password: hashedPass
            };
        },
        async login(username, password, session){
            const user = Object.entries(users).find(([id, u]) => u.username == username);

            if(user){
                const passwordsMatch = await bcrypt.compare(password, user[1].password);
                if(passwordsMatch){
                    session.user = {
                        _id: user[0],
                        username
                    };
                } else {
                    throw new Error('Wrong password! <a href="/login">Back to login page</a>');
                }
            } else {
                throw new Error('There is no user with that username! <a href="/login">Back to login page</a>');
            }
        }
    };

    next();
}