const Hotel = require('../models/Hotel');

async function bookHotel(id, userId){
    const hotel = await Hotel.findById(id);
    if(!hotel.usersBooked.includes(userId)){
        if(hotel.freeRooms > 1){
            hotel.usersBooked.push(userId);
            hotel.freeRooms--;
        } else {
            throw new Error('No more free rooms!');
        }
        return hotel.save();
    } else {
        throw new Error('User already booked this hotel!');
    }
}

module.exports = {
    bookHotel
}