const Trip = require('../models/Trip');
const User = require('../models/User');

async function createTrip(tripData, userId){
    const trip = new Trip(tripData);
    await trip.save();

    const user = await User.findById(userId);
    user.history.push(trip);

    await user.save();
    
    return trip;
}

async function getAllTrips() {
    return Trip.find({}).populate('buddies').lean();
}

async function getTripById(id){
    return Trip.findById(id).populate('buddies').populate('owner').lean();
}

async function joinTrip(id, userId){
    const trip = await Trip.findById(id);
    if(trip.seats > 0){
        trip.buddies.push(userId);
        trip.seats--;
    } else {
        throw new Error('No more seats left!');
    }
    return trip.save();
}

async function editTrip(id, tripData){
    const trip = await Trip.findById(id);
    Object.assign(trip, tripData);
    return trip.save();
}

async function deleteTrip(id){
    try {
        return Trip.deleteOne({ _id: id });
    } catch (err) {
        throw new ReferenceError('No such ID in database!');
    }
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    joinTrip,
    editTrip,
    deleteTrip
}