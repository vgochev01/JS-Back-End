const router = require('express').Router();

router.get('/', (req, res) => res.redirect('/products'));

router.get('/about', (req, res) => {
    const ctx = {
        title: 'About'
    }
    res.render('about');
});

router.post('/comments/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    const comment = {
        author: req.body.author,
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
