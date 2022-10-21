const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctor_profile_add = new Schema({
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
    }
   
   ,
    Salary: {
        type: String
    },
    
    
    address : {
        type: String
    },
}, {
timestamps: true
});
const doctor_add = mongoose.model('doctor_profile-add', doctor_profile_add);
module.exports = doctor_add;