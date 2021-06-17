module.exports = {
    async post(req, res) {
        const { cubeId } = req.params;
        const comment = {
            author: req.body.author,
            content: req.body.content
        };

        await req.storage.newComment(cubeId, comment);
        
        res.redirect('/details/' + cubeId);
    }
}