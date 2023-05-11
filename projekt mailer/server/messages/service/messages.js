const Message = require("../../models/messages");

const getMessages = async (req, res) => {
  const email = req.body.email;
  const messages = await Message.find({
    $or: [{ receiver: email }, { sender: email }],
  });
  return res.status(200).json({ success: true, messages: messages });
};
module.exports = {
  getMessages,
};
