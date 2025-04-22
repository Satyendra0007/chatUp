const router = require("express").Router();
const messageController = require("../controllers/message.controllers")
const { param, body } = require("express-validator")
const { requireAuth } = require("@clerk/express")

router.route("/get/:conversationId").get(
  requireAuth(),
  param("conversationId").trim().notEmpty().escape(),
  messageController.getMessages
)

router.route("/send").post(
  requireAuth(),
  body("conversationId").trim().notEmpty().escape().isString(),
  body("text").trim().notEmpty().escape().isString(),
  messageController.sendMessage
)


module.exports = router