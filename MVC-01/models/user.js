const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    jobTitle: {
      type: String,
    },

    gender: {
      type: String,
    },
  },
  { timestamps: true }
);


// Model // one parameter is modelname and second one is schema
const User = mongoose.model("User", userSchema);

module.exports = User;