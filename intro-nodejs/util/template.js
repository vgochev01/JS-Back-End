const fs = require('fs/promises');

async function loadTemplate(name){
    const template = await fs.readFile(`./views/${name}.html`);
    return template.toString();
}

async function layout(html, title = 'Home'){
    const layoutTemplate = await loadTemplate('layout');
    return layoutTemplate.replace('{{title}}', title).replace('{{body}}', html);
}

module.exports = {
    loadTemplate,
    layout
}