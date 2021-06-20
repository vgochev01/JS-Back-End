const Hotel = require('../models/Hotel');

async function bookHotel(id, userId){
    const hotel = await Hotel.findById(id);
    if(!hotel.usersBooked.includes(userId)){
        hotel.usersBooked.push(userId);
        return hotel.save();
    } else {
        throw new Error('User already booked this hotel!');
    }
}

module.exports = {
    bookHotel
}