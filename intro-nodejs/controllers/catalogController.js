const {loadTemplate, layout} = require('../util/template');
const database = require('../database');

module.exports = async (req, res) => {
    let items = Object.entries(database.database);
    items = items.map(([id, item]) => `<li data-id=${id}>Name: ${item.name}, Serial: ${item.serial} <a href="/delete?id=${id}">[Delete]</a></li>`).join('');
    
    let template = await loadTemplate('catalog');
    template = template.replace('{{items}}', items);

    res.write(await layout(template), 'Catalog');
    res.end();
}
