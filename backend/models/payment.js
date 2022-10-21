const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payment = new Schema({
    accountHold: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expireDate: {
        type: String,
        required: true
    },
    ccv: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    paymentTitle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {
timestamps: true
});
const system_Reg_Schema = mongoose.model('payment', payment);
module.exports = system_Reg_Schema;