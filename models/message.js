const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
    {
      content: {type:String},
      date: {type:Date},
      user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    }
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;