const router = require('express').Router();
const { isAuth } = require('../middlewares/guards');
const { parseMongooseError } = require('../util/parse');
const { preloadHotel } = require('../middlewares/preload');

router.get('/create', isAuth(), async (req, res) => {
    await req.storage.getAllHotels();
    const ctx = {
        title: 'Create Hotel'
    };
    res.render('booking/create', ctx);
});

router.post('/create', isAuth(), async (req, res) => {
    const data = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        freeRooms: req.body.freeRooms,
        usersBooked: [],
        owner: req.user._id
    }

    try {
        await req.storage.createHotel(data);
        res.redirect('/');
    } catch (err) {
        const ctx = {
            title: 'Create Hotel',
            errors: parseMongooseError(err)[0],
            userInput: data
        };
        res.render('booking/create', ctx);
    }
});

router.get('/:id', preloadHotel, (req, res) => {
    const hotel = req.data.hotel;
    const ctx = {
        title: 'Details',
        hotel
    }
    res.render('booking/details', ctx);
});

module.exports = router;