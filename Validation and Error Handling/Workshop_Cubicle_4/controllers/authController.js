const router = require('express').Router();
const { isAuth, isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', isGuest(), async (req, res) => {
    try {
        await req.auth.register(req.body);
        res.redirect('/products');
    } catch (err) {
        res.render('register', { 
            title: 'Register', 
            error: err.message, 
            username: req.body.username || ''
        });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body);
        res.redirect('/products');
    } catch (err) {
        res.render('login', { 
            title: 'Login', 
            error: err.message, 
            username: req.body.username || ''
        });
    }
});

router.get('/logout', isAuth(), async (req, res) => {
    await req.auth.logout();
    res.redirect('/products');
});

module.exports = router;
