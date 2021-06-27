const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    history: [{ type: Schema.Types.ObjectId, ref: 'Trip' }]
});

module.exports = model('User', schema);