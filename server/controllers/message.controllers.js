const Message = require("../models/Message.model");
const { validationResult, matchedData } = require("express-validator")
const { getAuth } = require('@clerk/express');

module.exports.getMessages = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ message: result.array() })
  }
  try {
    const { conversationId } = matchedData(req)
    const messages = await Message.find({ conversationId });
    res.status(200).json(messages)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error " })
  }

}

module.exports.sendMessage = async (req, res) => {
  const { userId } = getAuth(req);
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ message: result.array() })
  }
  try {
    const data = matchedData(req)
    await Message.create({ ...data, senderId: userId })
    res.status(200).json({ message: "Message Sent " })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: "Inatenal Server Error " })
  }

}