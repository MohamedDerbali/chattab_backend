const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema({
  participants: {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  LastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
