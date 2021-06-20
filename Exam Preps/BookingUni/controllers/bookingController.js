const router = require('express').Router();
const { isAuth, notOwner } = require('../middlewares/guards');

router.get('/:id', notOwner(), async(req, res) => {
    const { id } = req.params;
    try {
        await req.storage.bookHotel(id, req.user._id);
    } catch (err) {
        console.error(err.message);
    }
    res.redirect('/hotels/' + id);
});

module.exports = router;