const router = require('express').Router();

router.post('/', async(req, res) => {
    console.log(req.body);
    res.end();
});

module.exports = router;