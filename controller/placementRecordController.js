// Importing PlacementRecord model
const PlacementRecordModel = require('../models/placementRecordModel');
const mongoose = require('mongoose');

// get all PlacementRecords
const getPlacementRecords = async (req, res) => {
    try {
        const placementRecords = await PlacementRecordModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(placementRecords);
    } catch (error) {
        console.error("Error fetching placement records:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// get a single PlacementRecord
const getPlacementRecord = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such record exists" });
    }

    try {
        const placementRecord = await PlacementRecordModel.findById(id);
        if (!placementRecord) {
            return res.status(404).json({ error: "No such record exists" });
        }
        res.status(200).json(placementRecord);
    } catch (error) {
        console.error("Error fetching placement record:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// create a new PlacementRecord
const createPlacementRecord = async (req, res) => {
    const {studentId, companyName, ctc } = req.body;

    try {
        const placementRecord = await PlacementRecordModel.create({studentId, companyName, ctc });
        res.status(200).json(placementRecord);
    } catch (error) {
        console.error("Error creating placement record:", error);
        res.status(400).json({ error: error.message });
    }
}

// delete a PlacementRecord
const deletePlacementRecord = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such record exists" });
    }

    try {
        const placementRecord = await PlacementRecordModel.findOneAndDelete({ _id: id });
        if (!placementRecord) {
            return res.status(404).json({ error: "No such record exists" });
        }
        res.status(200).json(placementRecord);
    } catch (error) {
        console.error("Error deleting placement record:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// update a PlacementRecord
const updatePlacementRecord = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such record exists" });
    }

    try {
        const placementRecord = await PlacementRecordModel.findOneAndUpdate({ _id: id }, {
            ...req.body
        });
        if (!placementRecord) {
            return res.status(404).json({ error: "No such record exists" });
        }
        res.status(200).json(placementRecord);
    } catch (error) {
        console.error("Error updating placement record:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createPlacementRecord,
    getPlacementRecords,
    getPlacementRecord,
    deletePlacementRecord,
    updatePlacementRecord
}
