const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'It works!' });
});

router.post('/register', async (req, res) => {
    try {
        const userData = await req.auth.register(req.body.email, req.body.password);
        res.json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.post('/login', async(req, res) => {
    try {
        const userData = await req.auth.login(req.body.email, req.body.password);
        res.json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.json({});
});

module.exports = router;