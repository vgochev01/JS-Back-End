const router = require('express').Router();

router.get('/register', (req, res) => {
    console.log(req.user);
    const ctx = {
        title: 'Register'
    };
    res.render('user/register', ctx);
});

router.post('/register', async(req, res) => {
    const userInput = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    };
    try{
        await req.auth.register(userInput);
        res.redirect('/');
    } catch(err) {
        console.log(err.message);
    }
});

router.get('/login', (req, res) => {
    const ctx = {
        title: 'Login'
    };
    res.render('user/login', ctx);
});

module.exports = router;