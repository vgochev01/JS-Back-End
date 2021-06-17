const {loadTemplate, layout} = require('../util/template');

module.exports = async (req, res) => {
    const template = await loadTemplate('home');
    res.write(await layout(template));
    res.end();
}