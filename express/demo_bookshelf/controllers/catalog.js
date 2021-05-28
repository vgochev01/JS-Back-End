const router = require('express').Router();

router.get('/', (req, res) => {
    const ctx = {
        title: 'Catalog',
        books: req.storage.getBooks()
    }
    res.render('catalog', ctx);
});

router.get('/create', (req, res) => {
    const ctx = { title: 'Create' };
    res.render('create', ctx);
});

router.post('/create', (req, res) => {
    const { title, author } = req.body;
    if(title && author) {
        req.storage.addBook({ title, author });
        res.redirect('/catalog');
    } else {
        res.redirect('/catalog/create');
    }
});

router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const book = req.storage.getBookById(id);
    res.render('edit', book);
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, author } = req.body;
    if(title && author) {
        req.storage.editBook(id, { id, title, author });
        res.redirect('/catalog');
    } else {
        res.redirect('/catalog/edit/' + id);
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = req.storage.getBookById(id);
    res.render('details', book);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    req.storage.deleteBook(id);
    res.end();
});


module.exports = router;