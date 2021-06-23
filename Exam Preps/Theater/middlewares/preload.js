async function preloadPlay(req, res, next) {
    req.data = req.data || {};
    const play = await req.storage.getPlayById(req.params.id);
    if(play){
        req.data.play = play;
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    preloadPlay
}