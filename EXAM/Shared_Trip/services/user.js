const User = require('../models/User');

async function createUser(email, hashedPassword, gender){
    const user = new User({
        email,
        hashedPassword,
        gender,
        history: []
    });
    await user.save();
    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    return User.findOne({ email: { $regex: pattern } });
}

async function getTripHistory(userId){
    const user = await User.findById(userId).populate('history').lean();
    return user.history;
}

module.exports = {
    createUser,
    getUserByEmail,
    getTripHistory
}