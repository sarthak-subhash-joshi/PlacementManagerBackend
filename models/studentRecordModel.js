const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentRecordSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: true
    },
    universityPRN: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    classXScore: {
        type: Number,
        required: true
    },
    classXIIScore: {
        type: Number,
        required: true
    },
    UGAggregate: {
        type: Number,
        required: true
    },
    PGAggregate: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('student', studentRecordSchema);
