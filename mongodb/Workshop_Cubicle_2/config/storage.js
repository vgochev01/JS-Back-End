const fs = require('fs/promises');
const Cube = require('../models/Cube');

let data = {};

async function init(){
    try{
        data = JSON.parse(await fs.readFile('./models/data.json'));
    } catch (err) {
        console.error('Error reading database');
    }
    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit
        };
        next();
    }
}

async function getAll(query){
    const cubes = Cube.find({}).lean();
    console.log(cubes);
    return cubes;
}

async function getById(id){
    const cube = await Cube.findById(id).lean();
    if(cube) {
        return cube;
    } else {
        return undefined;
    }
}

async function create(cube){
    const record = new Cube(cube);
    return record.save();
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);

    if(!existing){
        throw new ReferenceError('No such ID in database!');
    }

    Object.assign(existing, cube);

    return existing.save();
}

module.exports = {
    init,
    getAll,
    getById,
    create
};