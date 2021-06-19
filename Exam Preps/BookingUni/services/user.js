const User = require('../models/User');

async function createUser(email, username, hashedPassword){
    const user = new User({
        email,
        username,
        hashedPassword
    });
    await user.save();
    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    return User.findOne({ username: { $regex: pattern } });
}

module.exports = {
    createUser,
    getUserByUsername
}