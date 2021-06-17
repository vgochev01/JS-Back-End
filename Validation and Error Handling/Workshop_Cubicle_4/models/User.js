const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true, minLength: 5, match: /^[a-zA-Z0-9]+$/ },
    hashedPassword: { type: String, required: true, min: 8}
});

module.exports = model('User', schema);
