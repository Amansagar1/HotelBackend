const DeluxeRoom = require('../models/DeluxeRoom');
const SuperDeluxeRoom = require('../models/SuperDeluxeRoom');
const FamilyRoom = require('../models/FamilyRoom');

exports.getAllRooms = async (req, res, next) => {
  try {
    const [deluxeRooms, superDeluxeRooms, familyRooms] = await Promise.all([
      DeluxeRoom.find(),
      SuperDeluxeRoom.find(),
      FamilyRoom.find()
    ]);

    const allRooms = [
      ...deluxeRooms.map(room => ({ ...room.toObject(), type: 'Deluxe Room' })),
      ...superDeluxeRooms.map(room => ({ ...room.toObject(), type: 'Super Deluxe Room' })),
      ...familyRooms.map(room => ({ ...room.toObject(), type: 'Family Room' }))
    ];

    res.status(200).json({
      success: true,
      count: allRooms.length,
      data: allRooms
    });
  } catch (error) {
    next(error);
  }
};
