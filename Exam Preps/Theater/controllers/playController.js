const { isAuth, isOwner } = require('../middlewares/guards');
const { preloadPlay } = require('../middlewares/preload');
const { parseMongooseError } = require('../util/parse');

const router = require('express').Router();

router.get('/create', isAuth(), (req, res) => {
    const ctx = {
        title: 'Create'
    };

    res.render('theater/create', ctx);
});

router.post('/create', isAuth(), async (req, res) => {
    const playData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        public: Boolean(req.body.public),
        owner: req.user._id
    };
    try {
        await req.storage.createPlay(playData);
        res.redirect('/');
    } catch (err) {
        const ctx = {
            errors: parseMongooseError(err),
            userInput: playData
        };
        res.render('theater/create', ctx);
    }
    
});

router.get('/details/:id', preloadPlay, async (req, res) => {
    const play = req.data.play;
    const ctx = {
        title: 'Details',
        isUser: req.user != undefined,
        isOwner: req.user && req.user._id == play.owner,
        hasLiked: play.usersLiked.includes(req.user && req.user._id),
        play
    };
    res.render('theater/details', ctx);
});

router.get('/edit/:id', preloadPlay, isOwner(), async (req, res) => {
    const play = req.data.play;
    const ctx = {
        title: 'Edit Play',
        play
    };
    res.render('theater/edit', ctx);
});

router.post('/edit/:id', preloadPlay, isOwner(), async (req, res) => {
    const playData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        public: Boolean(req.body.public)
    };
    try {
        await req.storage.editPlay(req.params.id, playData);
        res.redirect('/plays/details/' + req.params.id);
    } catch (err) {

        if(err instanceof ReferenceError){
            return res.redirect('/');
        }

        const ctx = {
            errors: parseMongooseError(err),
            play: req.data.play
        };

        res.render('theater/edit', ctx);
    }
});

router.get('/delete/:id', preloadPlay, isOwner(), async (req, res) => {
    try {
        await req.storage.deletePlay(req.params.id);
    } catch (err) {
        console.error(err.message);
    }
    res.redirect('/');
});

module.exports = router;