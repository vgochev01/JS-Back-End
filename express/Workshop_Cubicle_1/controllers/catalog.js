module.exports = {
    async catalog(req, res){
        const ctx = {
            title: 'Cubicle',
            cubes: await req.storage.getAll()
        }
        res.render('index', ctx);
    }
}