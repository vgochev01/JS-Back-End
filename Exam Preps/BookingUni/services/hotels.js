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

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById
}