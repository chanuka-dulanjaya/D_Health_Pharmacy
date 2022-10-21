const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeprofileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bod: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    salary: {
        type: String
    },
    position: {
        type: String
    },
}, {
timestamps: true
});
const profile_Schema = mongoose.model('employee_profile', EmployeeprofileSchema);
module.exports = profile_Schema;