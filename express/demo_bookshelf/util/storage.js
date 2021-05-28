const fs = require('fs/promises');

let data = {};

async function init() {
    data = JSON.parse(await fs.readFile('./data/books.json'));
    return (req, res, next) => {
        req.storage = {
            getBooks,
            getBookById,
            addBook,
            deleteBook
        }
        next();
    }
}

function getBooks(){
    return Object.values(data);
}

function getBookById(id){
    return data[id];
}

function addBook(book){
    const id = generateId();
    book['id'] = id;
    data[id] = book;
    saveData();
}

function deleteBook(id) {
    delete data[id];
    saveData();
}

async function saveData(){
    await fs.writeFile('./data/books.json', JSON.stringify(data));
}

function generateId(){
    let id;
    do {
        id = Math.random().toString(36).substr(2, 9); 
    } while (data[id] != undefined);
    return id;
}

module.exports = init;