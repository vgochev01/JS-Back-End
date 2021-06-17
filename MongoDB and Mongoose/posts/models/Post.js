const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person', required: true},
    title: { type: String, minLength: 10, required: true },
    content: { type: String, minLength: 15, required: true },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comments'}]
});

module.exports = model('Post', postSchema);