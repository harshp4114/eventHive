const chat=require('../models/chat.js');

async function getAllChats(req,res){
    try{
        const chats = await chat.find();
        res.status(200).json(chats);
    }catch (err){
        console.log("error retrieving chats",err);
    }
}

async function getChatByEventHost(req,res) {
    try{
        const {event_hostId}=req.params;
        const chatWithId=await chat.find({event_host_id:event_hostId});
        if(chatWithId.length==0){
           res.status(404).send("no chat found with the particular event host id");
        }else{
            res.status(200).json(chatWithId);
        }

    }catch(err){
        console.log(err,"error in finding chat with id");
    }
}

async function getChatBySponsor(req,res) {
    try{
        const {sponsor_id}=req.params;
        const chatWithId=await chat.find({sponsor_id:sponsor_id});
        if(chatWithId.length==0){
           res.status(404).send("no chat found with the particular sponsor id");
        }else{
            res.status(200).json(chatWithId);
        }

    }catch(err){
        console.log(err,"error in finding chat with id");
    }
}

async function getChatById(req,res) {
    try{
        const{chatId}=req.params;
        const chatWithId=await chat.find({_id:chatId});
        if(chatWithId.length==0){
            res.status(404).send("no chat present with the particular chat id");
        }else{
            res.status(200).json(chatWithId);
        }
    }catch(err){
        console.log(err,"error in finding the chat with id");
    }
}

async function createChat(req,res) {
    try {
        const {
            event_host_id,
            sponsor_id,
            messages,
            unread_messages,
            last_message_timestamp
        } = req.body;
        const eventHostId = new mongoose.Types.ObjectId(event_host_id);
        const sponsorId = new mongoose.Types.ObjectId(sponsor_id);
        const lastMessageTimestamp = new Date(last_message_timestamp);
        const newChat = new chat({
            event_host_id: eventHostId,
            sponsor_id: sponsorId,
            messages: msg,
            unread_messages: unread_messages,
            last_message_timestamp: lastMessageTimestamp
        });
        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (err) {
        console.log("error adding chat", err);
        res.status(500).send("Server Error");
    }
}

async function deleteChatById(req,res) {
    try{
        const {chatId}=req.params;
        const deleteChat= await chat.findByIdAndDelete(chatId);
        if(!deleteChat){
            res.status(404).send("chat with particular id not found");
        }else{
            res.status(200).send("chat with the particular id deleted successfully");
        }
    }catch(err){
        console.log("error adding chat", err);
        res.status(500).send("Server Error");   
    }
}

module.exports={
    getAllChats,
    getChatByEventHost,
    getChatBySponsor,
    getChatById,
    createChat,
    deleteChatById,
}