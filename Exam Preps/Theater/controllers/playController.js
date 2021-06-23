const router = require('express').Router();

router.get('/create', (req, res) => {
    const ctx = {
        title: 'Create'
    };

    res.render('theater/create', ctx);
});

router.post('/create', async (req, res) => {

});

module.exports = router;