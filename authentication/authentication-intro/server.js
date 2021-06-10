const express = require('express');
const expressSession = require('express-session');
const routes = require('./routes');
const auth = require('./auth');

const app = express();

app.use(expressSession({
    secret: 'my random secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: false }));
app.use(auth);

routes(app);

app.post('/register', async (req, res) => {
    if(req.body.password == req.body.repass){
        try{
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/login');
        } catch (err) {
            res.send(err.message);
        }
    } else {
        res.send('Both passwords must match! <a href="/register">Back to register page');
    }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await req.auth.login(username, password, req.session);
        res.redirect('/');
    } catch (err) {
        res.send(err.message);
    }
});

app.get('/logout', (req, res) => {
    if(req.session.user){
        delete req.session.user;
    }
    res.redirect('/');
});

app.listen(3000);