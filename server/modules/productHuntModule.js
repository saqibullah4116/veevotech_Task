const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product name"],
    trim: true, // so to remove white spaces, to store data properly
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  location: {
    type: String,
    required: [true, "Please Enter location"],
    maxLength: [90, "Please keep it short"],
  },
  images: [
    {
      //i will be using cloudinary for managind image
      // cloudinary use two things publicID and url
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter category"],
  },
  date: {
    type: String,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
