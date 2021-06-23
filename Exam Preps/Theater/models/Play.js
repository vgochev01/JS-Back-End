const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field!']
    },
    description: {
        type: String,
        required: [true, 'Description is a required field!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is a required field!'],
        match: [/^https?:\/\//, 'Please enter a valid image URL!']
    },
    public: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    usersLiked: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }
});

module.exports = model('Play', schema);