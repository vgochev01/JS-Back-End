const User = require('../models/User');

async function createUser(email, hashedPassword){
    const existing = await User.findOne({ email });

    if(existing){
        throw new Error('There is already an user with that email!');
    }

    const user = new User({ email, hashedPassword });
    await user.save();
    return user;
}

async function getUserByEmail(email){
    return User.findOne({ email });
}

module.exports = {
    createUser,
    getUserByEmail
};