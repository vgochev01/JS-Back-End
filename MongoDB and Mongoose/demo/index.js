const mongoose = require("mongoose");

const connectionStr = "mongodb://localhost:27017/testdb";

start();

async function start() {
  const client = await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        validate: {
            validator: function(value) {
                const letter = value.slice(0, 1);
                return letter === letter.toLocaleUpperCase();
            },
            message: 'First name must start with capital letter!'
        }
    },
    lastName: String,
    age: Number
  });

  personSchema.methods.sayHi = function() {
      console.log(`My name is ${this.fullName} and I am ${this.age} years old!`);
  }

  personSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
  });

  const Person = mongoose.model('Person', personSchema);

  try {
    const data = await Person.find({}).sort({age: +1}).skip(1);
    data.forEach(p => p.sayHi());
  } catch (err){
      console.error(err.message);
  }
}
