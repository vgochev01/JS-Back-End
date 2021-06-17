const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', {
        title: 'Create New Accessory'
    });
});

router.post('/create', async (req, res) => {
    const accessory = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    };

    try {
        await req.storage.createAccessory(accessory);
        res.redirect('/');
    } catch (err) {
        // Handle error -> res.render with error message
    }
});

router.get('/attach/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    const cube = await req.storage.getById(cubeId);
    
    if(cube == undefined){
        return res.redirect('/404');
    } else {
        const accessories = await req.storage.getAccessories(cube.accessories);
        const ctx = {
            title: 'Cube Details',
            cube,
            accessories
        }
        res.render('attachAccessory', ctx);
    }
});

router.post('/attach/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    const accessoryId = req.body.accessory;
    
    try{
        await req.storage.attachAccessory(cubeId, accessoryId);
    } catch (err) {
        // Handle error -> res.render with error message
    }

    res.redirect(`/products/details/${cubeId}`);
});

module.exports = router;