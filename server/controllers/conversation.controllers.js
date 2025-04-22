const Conversation = require("../models/Conversation.model")
const { matchedData, validationResult } = require("express-validator")
const { getUserById } = require("../utils/clerk")
const { getAuth } = require('@clerk/express');

const isConversationExists = async (senderId, receiverId) => {
  const conversation = await Conversation.findOne({ senderId, receiverId })
  return !!conversation
}

module.exports.createConversation = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() })
  }
  try {
    const data = matchedData(req)
    const conversation = await isConversationExists(data.senderId, data.receiverId)
    if (!conversation) {
      await Conversation.create(data)
    }
    return res.status(201).json({ message: "Conversation Created !" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error !" })
  }
}

module.exports.getCoversation = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const conversations = await Conversation.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    })
    const response = await Promise.all(conversations.map(async ({ senderId, receiverId, _id }) => {
      const receiver = (senderId === userId) ? receiverId : senderId;
      const { id, firstName, imageUrl, emailAddresses } = await getUserById(receiver)
      return {
        conversationId: _id,
        receiverId: id,
        firstName,
        imageUrl,
        email: emailAddresses[0].emailAddress
      }
    }))
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}



