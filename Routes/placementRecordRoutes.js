const express = require("express");
const router = express.Router();
const {
  createPlacementRecord,
  getPlacementRecord,
  getPlacementRecords,
  deletePlacementRecord,
  updatePlacementRecord,
} = require("../controller/placementRecordController");

router.get("/", getPlacementRecords);
router.get("/:id", getPlacementRecord);
router.post("/", createPlacementRecord);
router.delete("/:id", deletePlacementRecord);
router.patch("/:id", updatePlacementRecord);

module.exports = router;
