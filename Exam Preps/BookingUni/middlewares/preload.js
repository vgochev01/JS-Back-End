async function preloadHotel(req, res, next){
    req.data = req.data || {};
    const { id } = req.params;
    try {
        const hotel = await req.storage.getHotelById(id);
        if(hotel){
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