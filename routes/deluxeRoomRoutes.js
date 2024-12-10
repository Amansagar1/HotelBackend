const express = require("express");
const router = express.Router();
const deluxeRoomController = require("../controllers/deluxeRoomController");

router.get("/", deluxeRoomController.getAllDeluxeRooms);
router.post("/", deluxeRoomController.createDeluxeRoom);
router.put("/:id", deluxeRoomController.updateDeluxeRoom);
router.delete("/:id", deluxeRoomController.deleteDeluxeRoom);
router.get("/:roomnumber", deluxeRoomController.getDeluxeRoomByNumber);

module.exports = router;
