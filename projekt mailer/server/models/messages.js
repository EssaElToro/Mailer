const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  sender: {
    type: String,
    require: true,
  },
  receiver: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

const Message = mongoose.model("messages", messageSchema);
module.exports = Message;
