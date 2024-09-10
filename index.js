const express = require("express");
const mongoose = require("mongoose");
const chat = require("./models/chat.js");
const app = express();
const Sponsor = require("./models/sponsor.js");
const chatRouter = require("./routes/chat.js");
const sponsorRouter = require("./routes/sponsor.js");
const eventHostRouter=require("./routes/eventHost.js");

mongoose
  .connect("mongodb://localhost:27017/EventHive")
  .then(() => {
    console.log("mongo successfully connected");
  })
  .catch((err) => {
    console.log("error:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router for chats
app.use("/chats", chatRouter);

//router for sponsors
app.use("/sponsors", sponsorRouter);

//router for eventhost
app.use("/eventhost", eventHostRouter);


//HOME PAGE
app.get("/", (req, res) => {
  res.end("checking server use /chats to get chats result.");
});

app.listen(4000, () => {
  console.log("server is listening");
});
