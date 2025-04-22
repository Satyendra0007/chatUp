require("dotenv").config()
const express = require("express");
const { createServer } = require("http")
const consversationRouter = require("./routes/conversation.routes")
const userRouter = require("./routes/user.routes")
const { connectDB } = require("./utils/db")
const cors = require("cors")
const { clerkMiddleware } = require('@clerk/express');
const messageRouter = require("./routes/message.routes")

const app = express();
const server = createServer(app);
const PORT = 3000;

app.use(clerkMiddleware());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/conversation", consversationRouter)
app.use("/api/message", messageRouter)

app.get("/", (req, res) => {
  res.status(200).send("Hello World !")
})

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server is Running ... ")
  })
}).catch((e) => {
  console.log("Failed to Connect With DB  ")
  console.log(e)
})
