module.exports = (catObj) => `
<li>
    <img src="${catObj.img}" alt="${catObj.name}">
    <h3>${catObj.name}</h3>
    <p><span>Breed: </span>${catObj.breed}</p>
    <p><span>Description: </span>${catObj.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="/edit/${catObj.id}">Change Info</a></li>
        <li class="btn delete"><a href="/find-home/${catObj.id}">New Home</a></li>
    </ul>
</li>
`;