const Furniture = require('../models/Furniture');

async function create(data){
    const furniture = new Furniture(data);
    return furniture.save();
}

async function getAll(){
    return Furniture.find({}).lean();
}

async function getById(id){
    return Furniture.findById(id).lean();
}

module.exports = {
    create,
    getAll,
    getById
}