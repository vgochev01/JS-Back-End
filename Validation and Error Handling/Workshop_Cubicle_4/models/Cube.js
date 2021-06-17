const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { 
        type: String, 
        required: [true, "Name is required!"], 
        minLength: [5, "Name must contain at least 5 characters!"],
        match: [/^[a-zA-Z0-9 ]+$/, "Name must contain only latin alphanumeric characters and whitespaces!"]
    },
    description: {
        type: String, 
        required: [true, "Description is required!"], 
        minLength: [20, "Description must contain at least 5 characters!"],
        match: [/^[a-zA-Z0-9 ]+$/, "Description must contain only latin alphanumeric characters and whitespaces!"]
    },
    imageUrl: { 
        type: String, 
        required: [true, "Image URL is required!"], 
        match: [/^https?:\/\//, "Please enter a valid image URL!"] 
    },
    difficulty: { type: Number, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Cube', schema);