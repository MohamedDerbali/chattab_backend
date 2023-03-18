const conversationModel = require("../models/conversation");
const chattabError = require("../middlewares/error");
const getConversation = async (req, res) => {
  try {
    const { recieverId } = req.params;
    const { _id } = req.user;
    console.log(_id);
    const fetchConversation = await conversationModel
      .findOne({
        $or: [
          {
            "participants.senderId": recieverId,
            "participants.receiverId": _id,
          },
          {
            "participants.receiverId": _id,
            "participants.senderId": recieverId,
          },
        ],
      })
      .populate("participants.receiverId participants.senderId messages LastMessage");
    if (!fetchConversation) {
      throw new chattabError("Conversation not found", 404);
    }
    res.status(200).json(fetchConversation);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};
module.exports = {
  getConversation,
};
