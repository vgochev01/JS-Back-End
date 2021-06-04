module.exports = {
    async edit(req, res){
        const { id } = req.params;
        const cube = await req.storage.getById(id);
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
    },
    async post(req, res) {
        const { id } = req.params;
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: Number(req.body.difficulty)
        };

        await req.storage.edit(id, cube);

        res.redirect('/details/' + id);
    }
}