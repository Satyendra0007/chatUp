const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    require: true
  },
  senderId: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  time: {
    type: Number,
    default: () => Date.now()
  },
})

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)
module.exports = Message