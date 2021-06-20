const router = require('express').Router();
const { isAuth } = require('../middlewares/guards');

router.get('/:id', isAuth(), async(req, res) => {
    
});

module.exports = router;