const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Medicine = new Schema({
   
    name: {
        type: String,
        required: true
    },date: {
        type: String,
        required: true
    },
    price: {
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
    } ,image: {
        type: String,
        required: true,
      }
   
}, {
timestamps: true
});
const vehicle_Schema = mongoose.model('Medicine', Medicine);
module.exports = vehicle_Schema;