const mongoose = require('mongoose');
const Person = require('./models/Person');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const connectionStr = `mongodb://localhost:27017/testdb`;

start();

async function start(){
    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const person = await Person.findOne({ firstName: 'Rado' });

    const post = await Post.findOne({}).populate('author');

    const comment = new Comment({
        author: person,
        post,
        content: 'This post is amazing!!!'
    });

    await comment.save();

    post.comments.push(comment);

    await post.save();

    console.log('Successfuly created comment and added it to the post!');
}