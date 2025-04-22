const router = require("express").Router()
const conversationController = require("../controllers/conversation.controllers")
const { body } = require("express-validator")
const { requireAuth } = require('@clerk/express')

router.route('/').get(
  requireAuth(),
  conversationController.getCoversation
)

router.route("/create").post(
  body("senderId").notEmpty().escape(),
  body("receiverId").notEmpty().escape(),
  conversationController.createConversation
)


module.exports = router