const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
  senderId: {
    require: true,
    type: String
  },
  receiverId: {
    require: true,
    type: String
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    require: true
  },
},
  { timestamps: true }
)

const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema)
module.exports = Conversation