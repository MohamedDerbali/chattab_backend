const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
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
    friendsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
