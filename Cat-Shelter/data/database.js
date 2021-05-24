const fs = require('fs');

async function getData(filename){
    return new Promise((resolve, reject) => {
        const data = fs.createReadStream(`./data/${filename}.json`);
        let breeds = '';
        data.on('error', (err) => reject(err));
        data.on('data', data => breeds += data);
        data.on('end', () => {
            resolve(breeds);
        });
    });
}

async function generateId(){

    const data = await getData('cats');
    const cats = JSON.parse(data);

    let id;
    do {
        id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
    } while(cats[id] != undefined);
    return id;
}

async function addBreed(breed){
    const data = await getData('breeds');
    const breeds = JSON.parse(data);

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

    const data = await getData('cats');
    const cats = JSON.parse(data);
    
    cats[id] = catObj;
    const stream = fs.createWriteStream('./data/cats.json');
    stream.write(JSON.stringify(cats));
    stream.on('error', (err) => console.log(err));
}

module.exports = {
    addBreed,
    addCat,
    getCats: () => getData('cats'),
    getBreeds: () => getData('breeds')
}