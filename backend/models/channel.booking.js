const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channel_booking = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone1: {
      type: String,
      required: true,
    },
    
    Doctor: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },
    MedicalCenter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userName:{
      type:String,
      required:true,
    }
  
  },
  {
    timestamps: true,
  }
);
const channel_booking_Schema = mongoose.model(
  "channel_booking",
  channel_booking
);
module.exports = channel_booking_Schema;
