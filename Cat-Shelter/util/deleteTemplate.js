module.exports = (catObj) => `
<form action="/find-home/${catObj.id}" method="POST" class="cat-form">
    <h2>Shelter the cat</h2>
    <img src="/${catObj.img}" alt="">
    <label for="name">Name</label>
    <input type="text" id="name" value="${catObj.name}" disabled>
    <label for="description">Description</label>
    <textarea id="description" disabled>${catObj.description}</textarea>
    <label for="group">Breed</label>
    <select id="group" disabled>
        <option value="${catObj.breed}">${catObj.breed}</option>
    </select>
    <button>SHELTER THE CAT</button>
</form>
`;