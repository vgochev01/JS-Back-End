const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required!'],
        minLength: [4, 'The name should be at least 4 characters long!']
    },
    city: {
        type: String,
        required: [true, 'City field is required!'],
        minLength: [3, 'The city should be at least 3 characters long!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        match: [/^http[s]?:\/\//, 'Please enter a valid image URL!']
    },
    freeRooms: {
        type: Number,
        required: true,
        min: [1, 'The number of free rooms should be between 1 and 100!'],
        max: [100, 'The number of free rooms should be between 1 and 100!'],
    },
    usersBooked: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Hotel', schema);