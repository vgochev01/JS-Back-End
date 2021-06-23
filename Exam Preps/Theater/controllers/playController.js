const { isAuth } = require('../middlewares/guards');
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

router.get('/details/:id', async (req, res) => {
    const play = await req.storage.getPlayById(req.params.id);
    const ctx = {
        title: 'Details',
        isUser: req.user != undefined,
        isOwner: req.user && req.user._id == play.owner,
        play
    };
    res.render('theater/details', ctx);
});

module.exports = router;