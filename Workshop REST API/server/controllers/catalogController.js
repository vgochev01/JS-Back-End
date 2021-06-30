const router = require('express').Router();
const { isAuth, isOwner } = require('../middlewares/guards');
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
    let query = req.query.where;
    let ownerId;
    if(query){
        ownerId = query.split('=')[1];
    }
    const data = await req.storage.getAll(ownerId);
    res.json(data);
});

router.get('/:id', preload, async(req, res) => {
    const data = req.data.toObject();
    data._ownerId = data.owner._id;
    res.json(data);
});

router.put('/:id', isAuth(), preload, isOwner(), async(req, res) => {
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
        const result = await req.storage.edit(req.data, data);
        res.json(result);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.delete('/:id', isAuth(), preload, isOwner(), async(req, res) => {
    try {
        await req.storage.deleteItem(req.params.id);
        res.json({});
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

module.exports = router;