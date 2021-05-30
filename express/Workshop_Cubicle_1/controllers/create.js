module.exports = {
    create(req, res){
        const ctx = {
            title: 'Create Cube'
        }
        res.render('create');
    },
    async post(req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: req.body.difficulty
        };

        await req.storage.create(cube);

        res.redirect('/');
    }
}