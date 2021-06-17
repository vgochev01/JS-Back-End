module.exports = {
    notFound(req, res){
        const ctx = {
            title: 'Page Not Found'
        }
        res.render('404');
    }
}