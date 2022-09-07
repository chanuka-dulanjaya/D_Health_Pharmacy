const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Medicine_Rq = new Schema({
   
    name: {
        type: String,
        required: true
    },date: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },status: {
        type: String,
        required: true
    } 
   
}, {
timestamps: true
});
const Medicine_Rq_Schema = mongoose.model('Medicine_Rq', Medicine_Rq);
module.exports = Medicine_Rq_Schema;