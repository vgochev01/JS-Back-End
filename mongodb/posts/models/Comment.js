const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person', required: true},
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, minLength: 15, required: true }
});

module.exports = model('Comment', commentSchema);