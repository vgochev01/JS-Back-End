const Furniture = require('../models/Furniture');

async function create(data){
    const furniture = new Furniture(data);
    await furniture.save();
    return furniture;
}

async function getAll(ownerId){
    let query = {};
    if(ownerId){
        query = { owner: ownerId };
    }
    return Furniture.find(query).lean();
}

async function getById(id){
    try {
        const data = await Furniture.findById(id).populate('owner');
        return data;
    } catch (err) {
        throw new Error('Database Error');
    }
}

async function edit(existing, updated) {
    Object.assign(existing, updated);
    await existing.save();
    return existing;
}

async function deleteItem(id){
    try {
        await Furniture.findByIdAndDelete(id);
    } catch (err) {
        throw new Error('No such id in database!');
    }
}

module.exports = {
    create,
    getAll,
    getById,
    edit,
    deleteItem
}