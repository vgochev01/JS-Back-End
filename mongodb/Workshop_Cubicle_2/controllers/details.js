module.exports = {
    async details(req, res){
        const { id } = req.params;
        const cube = await req.storage.getById(id);
        
        if(cube == undefined){
            res.redirect('/404');
        } else {
            const ctx = {
                title: 'Cube Details',
                cube
            }
            res.render('details', ctx);
        }
    }
}