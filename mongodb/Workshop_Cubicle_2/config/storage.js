const Cube = require('../models/Cube');
const Comment = require('../models/Comment');
const Accessory = require('../models/Accessory');

function init(){
    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit,
            newComment,
            createAccessory,
            getAccessories,
            attachAccessory
        };
        next();
    }
}

async function getAll(query){
    const options = {};

    if(query.search) {
        options.name = { $regex: query.search, $options: 'i' };
    }

    if(query.from) {
        options.difficulty = { $gte: query.from };
    }

    if(query.to){
        options.difficulty = options.difficulty || {};
        options.difficulty.$lte = query.to;
    }

    const cubes = Cube.find(options).lean();
    return cubes;
}

async function getById(id){
    const cube = await Cube.findById(id).populate('comments').populate('accessories').lean();
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

async function newComment(id, comment){
    const cube = await Cube.findById(id);

    if(!cube){
        throw new ReferenceError('No Such ID in database!');
    }

    const newComment = new Comment(comment);
    await newComment.save();

    cube.comments.push(newComment)
    await cube.save();
}

async function getAccessories(existing){
    return Accessory.find({ _id: { $nin: existing } }).lean();
}

async function attachAccessory(cubeId, accessoryId){
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    if(!cube || !accessory){
        throw new ReferenceError('No Such ID in database!');
    }

    cube.accessories.push(accessory);
    return cube.save();
}

async function createAccessory(accessory){
    const record = new Accessory(accessory);
    return record.save();
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    edit,
    newComment,
    createAccessory,
    getAccessories,
    attachAccessory
};