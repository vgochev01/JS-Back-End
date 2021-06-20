const Hotel = require('../models/Hotel');

async function createHotel(data){
    const hotel = new Hotel(data);
    return hotel.save();
}

async function getAllHotels(){
    return Hotel.find({}).populate('owner').lean();
}

async function getHotelById(id){
    return Hotel.findById(id).populate('usersBooked').populate('owner').lean();
}

async function editHotel(id, data){
    const existing = await Hotel.findById(id);

    if(!existing){
        throw new ReferenceError('No such ID in database!');
    }

    Object.assign(existing, data);

    return existing.save();
}

async function deleteHotel(id) {
    try {
        return Hotel.deleteOne({ _id: id });
    } catch (err) {
        throw new ReferenceError('No such ID in database!');
    }
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    editHotel,
    deleteHotel
}