module.exports = {
    async catalog(req, res){
        const query = req.query;
        const ctx = {
            title: 'Cubicle',
            cubes: await req.storage.getAll(query),
            search: req.query.search || '',
            from: req.query.from || '',
            to: req.query.to || ''
        }
        res.render('index', ctx);
    }
}