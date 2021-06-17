module.exports = {
    about(req, res){
        const ctx = {
            title: 'About'
        }
        res.render('about');
    }
}