const express = require('express');
const hbs = require('express-handlebars');

const { catalog } = require('./controllers/catalog');
const { create, post: createPost } = require('./controllers/create');
const { edit, post: editPost } = require('./controllers/edit');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');
const { init } = require('./models/database');

start();

async function start(){
    const app = express();
    const port = 3000;

    app.engine('hbs', hbs({
        extname: '.hbs'
    }));

    app.set('view engine', 'hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(await init());

    app.get('/', catalog);
    app.get('/details/:id', details);
    app.get('/about', about);
    app.get('/create', create);
    app.post('/create', createPost);
    app.get('/edit/:id', edit);
    app.post('/edit/:id', editPost);

    app.all('*', notFound);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}