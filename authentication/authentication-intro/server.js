const express = require('express');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');
const routes = require('./routes');

const app = express();

const users = {};

app.use(expressSession({
    secret: 'my random secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: false }));

routes(app);

app.post('/register', async (req, res) => {
    if(req.body.password == req.body.repass){
        const id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);

        const hashedPass = await bcrypt.hash(req.body.password, 8);
    
        users[id] = {
            username: req.body.username,
            password: hashedPass
        };
    
        res.redirect('/login');
    } else {
        res.send('Both passwords must match! <a href="/register">Back to register page');
    }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;

    const user = Object.entries(users).find(([id, u]) => u.username == username);

    if(user){
        const passwordsMatch = await bcrypt.compare(req.body.password, user[1].password);
        if(passwordsMatch){
            req.session.user = {
                _id: user[0],
                username
            };
            res.redirect('/');
        } else {
            res.send('Wrong password! <a href="/login">Back to login page</a>');
        }
    } else {
        res.send('There is no user with that username! <a href="/login">Back to login page</a>');
    }
});

app.get('/logout', (req, res) => {
    if(req.session.user){
        delete req.session.user;
    }
    res.redirect('/');
});

app.listen(3000);