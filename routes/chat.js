const express=require('express');
const mongoose=require('mongoose');
const chat =require('../models/chat.js');
const app=express();
const router=express.Router();
const {getAllChats,
    getChatByEventHost,
    getChatBySponsor,
    getChatById,
    createChat,
    deleteChatById,
}=require('../controllers/chat.js');


//fetching all chats
router.get("/",getAllChats);

//fetching chat using eventhost id
router.get("/by-host/:event_hostId",getChatByEventHost);

//fetching chats using sponsor id
router.get("/by-sponsor/:sponsor_id",getChatBySponsor);

//fetching chat with chat id
router.get("/:chatId",getChatById);


//adding chat using post request
router.post("/chats", createChat);


//deleting a particular chat with chat id
router.delete("/:chatId",deleteChatById);

module.exports =router;