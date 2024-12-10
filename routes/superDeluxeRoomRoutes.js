const express = require("express");
const router = express.Router();
const superDeluxeRoomController = require("../controllers/superDeluxeRoomController");

router.get("/", superDeluxeRoomController.getAllSuperDeluxeRooms);
router.post("/", superDeluxeRoomController.createSuperDeluxeRoom);
router.put("/:id", superDeluxeRoomController.updateSuperDeluxeRoom);
router.delete("/:id", superDeluxeRoomController.deleteSuperDeluxeRoom);
router.get("/:roomnumber", superDeluxeRoomController.getSuperDeluxeRoomByNumber);
module.exports = router;
