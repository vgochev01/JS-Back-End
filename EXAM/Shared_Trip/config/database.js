const mongoose = require('mongoose');
const { CONNECTION_STR } = require('.');

module.exports = async (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(CONNECTION_STR,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

        const db = mongoose.connection;

        db.on('error', (err) => {
            console.error('Database error: ' + err.message);
            reject(err.message);
        });

        db.on('open', () => {
            console.log('Database Connected!');
            resolve();
        });
    });
}