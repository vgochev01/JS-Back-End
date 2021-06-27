const { Schema, model } = require('mongoose');

const schema = new Schema({
    startPoint: {
        type: String,
        required: [true, 'Start Point field is required!'],
        minLength: [4, 'Start Point must be at least 4 characters long!']
    },
    endPoint: {
        type: String,
        required: [true, 'End Point field is required!'],
        minLength: [4, 'End Point must be at least 4 characters long!']
    },
    date: {
        type: String,
        required: [true, 'Trip Date is required!']
    },
    time: {
        type: String,
        required: [true, 'Trip Time is required!']
    },
    carImage: {
        type: String,
        required: [true, 'Car Image is required!'],
        match: [/^https?:\/\//, 'Please enter a valid Image URL!']
    },
    carBrand: {
        type: String,
        required: [true, 'Car Brand is required!'],
        minLength: [4, 'Car Brand must be at least 4 characters long!']
    },
    seats: {
        type: Number,
        required: [true, 'Seats field is required!'],
        min: [0, 'Seats must be from 0 to 4 inclusive!'],
        max: [4, 'Seats must be from 0 to 4 inclusive!']
    },
    price: {
        type: Number,
        required: [true, 'Trip Price is required!'],
        min: [1, 'Price must be from 1 to 50 inclusive!'],
        max: [50, 'Price must be from 1 to 50 inclusive!']
    },
    description: {
        type: String,
        required: [true, 'Description field is required!'],
        minLength: [10, 'Description must be at least 10 characters long!']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    buddies: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = model('Trip', schema);