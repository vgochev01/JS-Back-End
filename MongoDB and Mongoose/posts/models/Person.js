const { Schema, model } = require('mongoose');

const personSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number
});

module.exports = model('Person', personSchema);