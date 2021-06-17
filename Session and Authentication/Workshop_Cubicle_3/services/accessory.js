const Accessory = require('../models/Accessory');

async function getAccessories(existing){
    return Accessory.find({ _id: { $nin: existing } }).lean();
}

async function attachAccessory(cubeId, accessoryId){
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    if(!cube || !accessory){
        throw new ReferenceError('No Such ID in database!');
    }

    cube.accessories.push(accessory);
    return cube.save();
}

async function createAccessory(accessory){
    const record = new Accessory(accessory);
    return record.save();
}

module.exports = {
    createAccessory,
    getAccessories,
    attachAccessory
}