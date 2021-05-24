module.exports = (breedsArr) => `
<select name="breed" id="group">
${breedsArr.map(b => `<option value="${b}">${b}</option>`)}
</select>
`;