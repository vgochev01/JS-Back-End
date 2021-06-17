const {loadTemplate, layout} = require('../util/template');

module.exports = async (req, res) => {
    const template = await loadTemplate('about');
    res.write(await layout(template, 'About'));
    res.end();
}