const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    birthDate: { type: Date },
    profilePicture: { type: String },
    email: { type: String },
    status: { type: Boolean },
    phoneNumber: { type: Number },
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
