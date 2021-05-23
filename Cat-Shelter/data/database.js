const database = {
    breeds: [],
    cats: {
        '3423432': {
            img: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
            alt: 'some cat',
            description: 'cool cat by valeri',
            breed: 'siam',
            id: '3423432'
        }
    }
};

function generateId(){
    let id;
    do {
        id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
    } while(database.cats[id] != undefined);
}

function addBreed(breed){
    if(database.breeds.includes(breed) == false){
        database.breeds.push(breed);
    } else {
        // do something
    }
}

function addCat(catObj){
    const id = generateId();
    catObj.id = id;
    database.cats[id] = catObj;
}

module.exports = {
    database,
    addBreed,
    addCat
}