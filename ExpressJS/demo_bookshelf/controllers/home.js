module.exports = (req, res) => {
    const ctx = { title: 'Home' }
    res.render('home', ctx);
}