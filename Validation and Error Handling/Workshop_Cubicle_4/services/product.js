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
        const cube = await Cube.findById(id).populate({ path: 'comments', populate: { path: 'author' } }).populate('accessories').populate('author').lean();
        if(cube) {
            const viewModel = {
                _id: cube._id,
                name: cube.name,
                description: cube.description,
                imageUrl: cube.imageUrl,
                difficulty: cube.difficulty,
                comments: cube.comments.map(c => ({ author: c.author.username, content: c.content })),
                accessories: cube.accessories,
                author: cube.author?.username,
                authorId: cube.author?._id
            }
            console.log(viewModel.comments);
            return viewModel;
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

async function deleteCube(cubeId) {
    try {
        return Cube.deleteOne({ _id: cubeId });
    } catch (err) {
        throw new ReferenceError('No such ID in database!');
    }
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
    deleteCube,
    newComment
}