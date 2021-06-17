module.exports = (req, res) => {
    res.statusCode = 404;
    res.write('Not Found!');
    res.end();
}