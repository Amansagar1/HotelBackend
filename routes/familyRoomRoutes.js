const express = require("express");
const router = express.Router();
const familyRoomController = require("../controllers/familyRoomController");

router.get("/", familyRoomController.getAllFamilyRooms);
router.post("/", familyRoomController.createFamilyRoom);
router.put("/:id", familyRoomController.updateFamilyRoom);
router.delete("/:id", familyRoomController.deleteFamilyRoom);

module.exports = router;
