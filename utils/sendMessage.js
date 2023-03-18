const conversationModel = require("../models/conversation");
const messageModel = require("../models/message");
const sendMessage = async (user) => {
  const { senderId, receiverId, message } = user;
  const fetchConversation = await conversationModel.findOne({
    $or: [
      {
        "participants.senderId": senderId,
        "participants.receiverId": receiverId,
      },
      {
        "participants.receiverId": senderId,
        "participants.senderId": receiverId,
      },
    ],
  });
  const messageNew = await messageModel.create({
    user: senderId,
    content: message,
    date: new Date(),
  });
  if (!fetchConversation) {
    await conversationModel.create({
      participants: {
        senderId,
        receiverId,
      },
      LastMessage: messageNew._id,
      messages: [messageNew._id],
    });
  }
  await conversationModel.findByIdAndUpdate(fetchConversation._id, {
    $push: { messages: messageNew._id },
    LastMessage: messageNew._id,
  });
};
module.exports = { sendMessage };
