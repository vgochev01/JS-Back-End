const fs = require('fs');

async function getData(filename){
    return new Promise((resolve, reject) => {
        const data = fs.createReadStream(`./data/${filename}.json`);
        let fetchedData = '';
        data.on('error', (err) => reject(err));
        data.on('data', data => fetchedData += data);
        data.on('end', () => {
            resolve(JSON.parse(fetchedData));
        });
    });
}

async function generateId(){

    const cats = await getData('cats');

    let id;
    do {
        id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
    } while(cats[id] != undefined);
    return id;
}

async function addBreed(breed){
    const breeds = await getData('breeds');

    if(breeds.includes(breed) == false){
        breeds.push(breed);
        const stream = fs.createWriteStream('./data/breeds.json');
        stream.write(JSON.stringify(breeds));
        stream.on('error', (err) => console.log(err));
    }
}

async function addCat(catObj){
    const id = await generateId();
    catObj.id = id;

    const cats = await getData('cats');
    
    cats[id] = catObj;
    modifyCats(cats);
}

async function editCat(id, catObj){
    const cats = await getData('cats');
    cats[id] = catObj;
    modifyCats(cats);
}

async function deleteCat(id){
    const cats = await getData('cats');
    delete cats[id];
    modifyCats(cats);
}

function modifyCats(data){
    const stream = fs.createWriteStream('./data/cats.json');
    stream.write(JSON.stringify(data));
    stream.on('error', (err) => console.log(err));
}

module.exports = {
    addBreed,
    addCat,
    editCat,
    deleteCat,
    getCats: () => getData('cats'),
    getBreeds: () => getData('breeds')
}