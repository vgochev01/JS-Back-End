const Play = require('../models/Play');

async function createPlay(playData){
    const play = new Play(playData);
    return play.save();
}

async function getAllPlays(orderBy){
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
            const error = new Error('No such id in database!');
        }

    } catch (err) {
        console.error(err.messaage);
        throw err;
    }
}

module.exports = {
    createPlay,
    getAllPlays,
    getPlayById,
    editPlay
};