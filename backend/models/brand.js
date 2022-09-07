const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brand = new Schema(
  {
    Brand: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    email: {
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
const brand_Schema = mongoose.model("brand", brand);
module.exports = brand_Schema;
