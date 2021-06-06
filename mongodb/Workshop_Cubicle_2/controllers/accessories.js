module.exports = {
    createAccessory(req, res) {
        res.render('createAccessory', {
            title: 'Create New Accessory'
        });
    },

    async accessoryPost(req, res) {
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };

        try {
            await req.storage.createAccessory(accessory);
            res.redirect('/');
        } catch (err) {
            // Handle error -> res.render with error message
        }

    }
}