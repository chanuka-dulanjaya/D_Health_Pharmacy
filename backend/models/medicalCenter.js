const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medical_Center = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    telephone1: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone2: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const medical_Center_Schema = mongoose.model("medical_Center", medical_Center);
module.exports = medical_Center_Schema;
