const { getBreeds } = require('../data/database');
const breedSelectTemplate = require('./breedSelectTemplate');


module.exports = async (catObj) => {

    const breeds = await getBreeds();
    
    return `
        <form action="/edit/${catObj.id}" method="POST" class="cat-form" enctype="multipart/form-data">
            <h2>Edit Cat</h2>
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${catObj.name}">
            <label for="description">Description</label>
            <textarea name="description" id="description">${catObj.description}</textarea>
            <label for="image">Image</label>
            <input name="upload" type="file" id="image">
            <label for="group">Breed</label>
            ${breedSelectTemplate(breeds, catObj.breed)}
            <button>Edit Cat</button>
        </form>
    `;
}