async function preloadHotel(req, res, next){
    req.data = req.data || {};
    const { id } = req.params;
    try {
        const hotel = await req.storage.getHotelById(id);
        if(hotel){
            hotel.isLogged = req.user != undefined;
            hotel.isOwner = (req.user && req.user._id) == hotel.owner._id;
            req.data.hotel = hotel;
        }
    } catch (err) {
        console.log('Database Error: ', err.message);
    }
    next();
}

module.exports = {
    preloadHotel
}