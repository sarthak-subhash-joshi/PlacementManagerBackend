const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placementRecordSchema = new Schema({
    studentId: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    ctc: {
        type: String,
        required: true
    },
    
}, { timestamps: true });

module.exports = mongoose.model('placement_record', placementRecordSchema);
