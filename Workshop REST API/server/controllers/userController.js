const { isGuest } = require('../middlewares/guards');

const router = require('express').Router();

router.post('/register', isGuest() , async (req, res) => {
    try {
        const userData = await req.auth.register(req.body.email, req.body.password);
        res.json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.post('/login', isGuest(), async(req, res) => {
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