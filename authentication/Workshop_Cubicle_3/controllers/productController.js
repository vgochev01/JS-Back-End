const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    const query = req.query;
    const ctx = {
        title: 'Cubicle',
        cubes: await req.storage.getAll(query),
        search: req.query.search || '',
        from: req.query.from || '',
        to: req.query.to || ''
    }
    res.render('index', ctx);
});

router.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    const cube = await req.storage.getById(id);

    if(cube == undefined){
        return res.redirect('/404');
    } else {
        const ctx = {
            title: 'Cube Details',
            cube
        }
        res.render('details', ctx);
    }
});

router.get('/create', (req, res) => {
    const ctx = {
        title: 'Create Cube'
    }
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty)
    };
    
    try {
        await req.storage.create(cube);
    } catch (err) {
        if(err.name == 'ValidationError') {
            return res.render('create', { title: 'Create Cube', error: 'All fields are required. Image URL must be a valid URL.'});
        }
    }

    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const cube = await req.storage.getById(id);
    cube[`select${cube.difficulty}`] = true;

    if(cube == undefined){
        res.redirect('/404');
    } else {
        const ctx = {
            title: 'Edit Cube',
            cube
        }
        res.render('edit', ctx);
    }
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty)
    };

    await req.storage.edit(id, cube);

    res.redirect('/products/details/' + id);
});

module.exports = router;