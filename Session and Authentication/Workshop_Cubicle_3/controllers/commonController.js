const router = require('express').Router();

const { isAuth } = require('../middlewares/guards');

router.get('/', (req, res) => res.redirect('/products'));

router.get('/about', (req, res) => {
    const ctx = {
        title: 'About'
    }
    res.render('about');
});

router.post('/comments/:cubeId', isAuth(), async (req, res) => {
    const { cubeId } = req.params;
    const comment = {
        author: req.user._id,
        content: req.body.content
    };

    await req.storage.newComment(cubeId, comment);
    res.redirect('/products/details/' + cubeId);
});

router.get('*', (req, res) => {
    const ctx = {
        title: 'Page Not Found'
    }
    res.render('404');
});

module.exports = router;
