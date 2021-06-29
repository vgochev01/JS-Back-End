const router = require('express').Router();
const preload = require('../middlewares/preload');

router.post('/', async(req, res) => {
    const data = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material,
        owner: req.user._id
    }
    try {
        const result = await req.storage.create(data);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.end();
    }
});

router.get('/', async(req, res) => {
    const data = await req.storage.getAll();
    res.json(data);
});

router.get('/:id', preload, async(req, res) => {
    const data = req.data.toObject();
    data._ownerId = data.owner._id;
    console.log(data);
    res.json(data);
});

router.put('/:id', preload, async(req, res) => {
    const data = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material
    }

    try {
        await req.storage.edit()
        
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

module.exports = router;