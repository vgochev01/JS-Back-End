const express = require('express');
const hbs = require('express-handlebars');
const logger = require('./util/logger');
const home = require('./controllers/home');
const catalog = require('./controllers/catalog');
const init = require('./util/storage');

async function start(){
    const app = express();

    app.engine('.hbs', hbs({
        extname: '.hbs'
    }))
    app.set('view engine', '.hbs');

    app.use(logger);
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));

    app.use(await init());

    app.get('/', home);
    app.use('/catalog', catalog);

    app.listen(3000, () => console.log('Server listening on port 3000'));
}

start();