const router = require('express').Router();

router.get('/', (req, res) => {
    const ctx = {
        books: req.storage.getBooks()
    }
    res.render('catalog', ctx);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = req.storage.getBookById(id);
    res.render('details', book);
})

module.exports = router;