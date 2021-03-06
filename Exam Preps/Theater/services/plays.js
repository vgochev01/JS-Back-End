const Play = require('../models/Play');

async function createPlay(playData){
    const play = new Play(playData);
    return play.save();
}

async function getAllPlays(orderBy){
    if(orderBy == 'likes') {
        return Play.find({ public: true }).sort({ usersLiked: 'desc' }).lean();
    }
    return Play.find({ public: true }).lean();
}

async function getPlayById(id){
    return Play.findById(id).lean();
}

async function editPlay(id, playData) {
    try {
        const existing = await Play.findById(id);
        
        if(existing){
            Object.assign(existing, playData);
            return existing.save();
        } else {
            throw new ReferenceError('No such ID in database!');
        }

    } catch (err) {
        console.error(err.messaage);
        throw err;
    }
}

async function deletePlay(id){
    try {
        return Play.deleteOne({ _id: id });
    } catch (err) {
        throw new ReferenceError('No such ID in database!');
    }
}

async function likePlay(id, userId){
    try {
        const existing = await Play.findById(id);
        
        if(existing){
            existing.usersLiked.push(userId);
            return existing.save();
        } else {
            throw new ReferenceError('No such ID in database!');
        }

    } catch (err) {
        throw err;
    }
}

module.exports = {
    createPlay,
    getAllPlays,
    getPlayById,
    editPlay,
    deletePlay,
    likePlay
};