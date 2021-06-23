const router = require('express').Router();

router.get('/', async (req, res) => {
    const plays = await req.storage.getAllPlays();
    const ctx = {
        title: 'Home',
        plays
    };

    res.render('home', ctx);
});

module.exports = router;