const { Router } = require('express');
const { isAuth, isAuthor } = require('../middlewares/guards');

const { preloadCube } = require('../middlewares/preload');

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

router.get('/details/:id', preloadCube, async (req, res) => {
    const cube = req.data.cube;
    cube.isOwner = cube.authorId == (req.user && req.user._id);
    
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

router.get('/create', isAuth(), (req, res) => {
    const ctx = {
        title: 'Create Cube'
    }
    res.render('create', ctx);
});

router.post('/create', isAuth(), async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty),
        author: req.user._id
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

router.get('/edit/:id', preloadCube, isAuthor(), async (req, res) => {
    const cube = req.data.cube;
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

router.post('/edit/:id', preloadCube, isAuthor(), async (req, res) => {
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