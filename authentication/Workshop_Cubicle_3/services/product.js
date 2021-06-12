const Cube = require('../models/Cube');
const Comment = require('../models/Comment');

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
    try{
        const cube = await Cube.findById(id).populate('comments').populate('accessories').lean();
        if(cube) {
            return cube;
        } else {
            throw new Error();
        }
    } catch (err){
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

module.exports = {
    getAll,
    getById,
    create,
    edit,
    newComment
}