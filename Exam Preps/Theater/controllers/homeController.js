const router = require('express').Router();

router.get('/', (req, res) => {
    const plays = [];
    const ctx = {
        title: 'Home',
        plays
    };

    res.render('home', ctx);
});

module.exports = router;