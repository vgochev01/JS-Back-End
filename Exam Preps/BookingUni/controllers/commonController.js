const router = require('express').Router();

router.get('/', (req, res) => {
    const ctx = {

    };
    res.render('home/home', ctx);
});

module.exports = router;