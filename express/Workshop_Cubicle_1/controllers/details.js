module.exports = {
    async details(req, res){
        const { id } = req.params;
        const ctx = {
            title: 'Cube Details',
            cube: await req.storage.getById(id)
        }
        res.render('details', ctx);
    }
}