module.exports = (breedsArr, selectedBreed) => `
<select name="breed" id="group">
${breedsArr.map(b => `<option value="${b}" ${b == selectedBreed ? 'selected' : ''}>${b}</option>`)}
</select>
`;