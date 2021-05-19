const layout = require("./layout");
const database = require('../database');

const html = (items) => `
<div>
    <h1>Catalog</h1>
    <form method="POST" action="/create">
        <label>Name: <input name="name" type="text"></label>
        <label>Serial: <input name="serial" type="text"></label>
        <input type="submit" value="Create Item">
    </form>
    <ul>
        ${items.map(([id, item]) => `<li data-id=${id}>Name: ${item.name}, Serial: ${item.serial} <a href="/delete?id=${id}">[Delete]</a></li>`).join('')}
    </ul>
</div>
`;

module.exports = (req, res) => {
    res.write(layout(html(Object.entries(database.database)), 'Catalog'));
    res.end();
}