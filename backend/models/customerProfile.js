const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emp_profile = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    telephone1: {
        type: String,
        required: true
    },
    Category: {
        type: String
    },
    otherCategory: {
        type: String
    },
    Brand: {
        type: String
    },
    otherBrand: {
        type: String
    },
    Salary: {
        type: String
    },
    Dream : {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    address : {
        type: String
    },
}, {
timestamps: true
});
const emp_profile_Schema = mongoose.model('cus_profile', emp_profile);
module.exports = emp_profile_Schema;