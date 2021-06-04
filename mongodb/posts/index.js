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

    //const person = await Person.findOne({ firstName: 'Rado' });

    const post = await Post.findOne({}).populate('author');

    console.log(post);
}