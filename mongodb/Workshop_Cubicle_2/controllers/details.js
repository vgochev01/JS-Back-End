module.exports = {
    async details(req, res){
        const { id } = req.params;
        const cube = await req.storage.getById(id);
        console.log(cube);
        if(cube == undefined){
            return res.redirect('/404');
        } else {
            const ctx = {
                title: 'Cube Details',
                cube
            }
            res.render('details', ctx);
        }
    },

    async attach(req, res) {
        const { cubeId } = req.params;
        const cube = await req.storage.getById(cubeId);
        const accessories = await req.storage.getAccessories(cube.accessories);

        if(cube == undefined){
            return res.redirect('/404');
        } else {
            const ctx = {
                title: 'Cube Details',
                cube,
                accessories
            }
            res.render('attachAccessory', ctx);
        }
    },

    async attachPost(req, res) {
        const { cubeId } = req.params;
        const accessoryId = req.body.accessory;
        
        try{
            await req.storage.attachAccessory(cubeId, accessoryId);
        } catch (err) {
            // Handle error -> res.render with error message
        }

        res.redirect(`/details/${cubeId}`);
    }
}