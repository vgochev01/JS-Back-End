const fs = require('fs/promises');

let data = {};

async function init() {
    data = JSON.parse(await fs.readFile('./data/books.json'));
    return (req, res, next) => {
        req.storage = {
            getBooks,
            getBookById
        }
        next();
    }
}

function getBooks(){
    return Object.entries(data).map(([id, book]) => {
        return {
            id,
            title: book.title,
            author: book.author
        }
    });
}

function getBookById(id){
    const book = data[id];
    book.id = id;
    return book;
}

module.exports = init;