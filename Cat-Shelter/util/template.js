const fs = require('fs/promises');

async function loadTemplate(name){
    const template = await fs.readFile(`./views/${name}.html`);
    return template.toString();
}

module.exports = {
    loadTemplate
}