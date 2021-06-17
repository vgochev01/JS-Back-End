const { Router } = require('express');
const { isAuth, isAuthor } = require('../middlewares/guards');

const { preloadCube } = require('../middlewares/preload');
const { parseMongooseError } = require('../util/parse');

const { body, validationResult } = require('express-validator');

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

router.post('/create',
isAuth(),
body('name').isLength({ min: 5 }).withMessage('Name must contain at least 5 characters!').matches(/^[a-zA-Z0-9 ]+$/).withMessage('Name must contain only latin alphanumeric characters and whitespaces!'),
body('description').isLength({ min: 20 }).withMessage('Description must contain at least 20 characters!').matches(/^[a-zA-Z0-9 ]+$/).withMessage('Description must contain only latin alphanumeric characters and whitespaces!'),
body('imageUrl').trim().not().isEmpty().withMessage('Image URL is required!').matches(/^https?:\/\//).withMessage('Please enter a valid image URL!'),
async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty),
        author: req.user._id
    };
    
    try {
        let errors = validationResult(req);
        if(errors.isEmpty() == false){
            errors = errors.mapped();
            throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
        }

        await req.storage.create(cube);
    } catch (err) {
        const ctx = {
            title: 'Create Cube'
        }
        if(err.name == 'ValidationError') {
            ctx.errors = parseMongooseError(err);
        } else {
            ctx.errors = err.message.split('\n');
        }

        return res.render('create', ctx);
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

router.get('/delete/:id', preloadCube, isAuthor(), async (req, res) => {
    const cube = req.data.cube;
    cube[`select${cube.difficulty}`] = true;

    if(cube == undefined){
        res.redirect('/404');
    } else {
        const ctx = {
            title: 'Delete Cube',
            cube
        }
        res.render('delete', ctx);
    }
});

router.post('/delete/:id', preloadCube, isAuthor(), async (req, res) => {
    await req.storage.deleteCube(req.params.id);
    res.redirect('/products');
});

module.exports = router;