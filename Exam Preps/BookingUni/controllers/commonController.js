const router = require('express').Router();

router.get('/', async (req, res) => {
    const hotels = await req.storage.getAllHotels();
    const ctx = {
        title: 'Home',
        hotels: hotels.sort((a, b) => b.freeRooms - a.freeRooms)
    };
    res.render('home/home', ctx);
});

module.exports = router;