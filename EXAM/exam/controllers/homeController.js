const { isAuth } = require('../middlewares/guards');
const { getTripHistory } = require('../services/user');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const ctx = {
        title: 'Home'
    };

    res.render('home', ctx);
});

router.get('/profile', isAuth(), async(req, res) => {
    const tripHistory = await getTripHistory(req.user._id);
    const ctx = {
        title: 'Profile',
        isMale: req.user.gender == 'male',
        tripHistory
    };

    res.render('user/profile', ctx);
});

module.exports = router;