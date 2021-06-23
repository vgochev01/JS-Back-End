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

module.exports = {
    createPlay,
    getAllPlays,
    getPlayById
};