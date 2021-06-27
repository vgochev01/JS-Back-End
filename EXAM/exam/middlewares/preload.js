async function preloadTrip(req, res, next) {
    req.data = req.data || {};
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if(trip){
            req.data.trip = trip;
            next();
        } else {
            res.redirect('/404');
        }
    } catch (err){
        if(err.name == 'CastError'){
            res.redirect('/404');
        };
    }
}

module.exports = {
    preloadTrip
}