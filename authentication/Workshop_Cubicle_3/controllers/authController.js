const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
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

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
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

router.get('/logout', async (req, res) => {
    await req.auth.logout();
    res.redirect('/products');
});

module.exports = router;
