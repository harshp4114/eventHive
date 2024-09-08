const express=require('express');
const mongoose=require('mongoose');
const chat =require('./chatSchema');
const app=express();
const Sponsor=require('./sponsorSchema');
mongoose.connect("mongodb://localhost:27017/EventHive")
.then(()=>{console.log("mongo successfully connected")})
.catch((err)=>{console.log("error:",err)});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
//fetching all chats
app.get("/chats",async (req,res)=>{
    try{
        const chats = await chat.find();
        res.status(200).json(chats);
    }catch (err){
        console.log("error retrieving chats",err);
    }
});

//fetching chat using eventhost id
app.get("/chats/by-host/:event_hostId",async (req,res)=>{
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
    
});

//fetching chats using sponsor id
app.get("/chats/by-sponsor/:sponsor_id",async (req,res)=>{
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
    
});

//fetching chat with chat id
app.get("/chats/:chatId",async (req,res)=>{
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
});


//adding chat using post request
app.post("/chats", async (req, res) => {
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
});


//deleting a particular chat with chat id
app.delete("/chats/delete/:chatId",async (req,res)=>{
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
});

//fetching all the sponsors 
app.get("/sponsors",async (req,res)=>{
    try{
        const sponsors = await Sponsor.find();
        if(sponsors.length==0){
            res.status(404).send("no sponsors present");
        }else{
        res.status(200).json(sponsors);
        }
    }catch (err){
        console.log("error retrieving sponsors",err);
    }
});

//fetching a particular sponsor with id
app.get("/sponsors/:sponsorId",async (req,res)=>{
    try{
        const{sponsorId}=req.params;
        const sponsorWithId= await Sponsor.find({_id:sponsorId});
        if(sponsorWithId.length==0){
            res.status(404).send("no sponsor with the particular id is present");
        }else{
            res.status(200).send(sponsorWithId);
        }
    }catch(err){
        console.log("error retrieving sponsor with particular id",err);
    }
});


//adding a sponsor
app.post("/sponsors",async(req,res)=>{
    try{
        const {
            CmpnyName,
            profilePic,
            contact_person,
            company_website,
            bio,
            logo,
            social_links,
            events_sponsored,
            auctions_participated,
            date_joined,
            accVerified
        } = req.body;

        const newSponsor = new Sponsor({
            CmpnyName: CmpnyName,
            profilePic: profilePic,
            contact_person: contact_person,
            company_website: company_website,
            bio: bio,
            logo: logo,
            social_links: social_links,
            events_sponsored: events_sponsored,
            auctions_participated: auctions_participated,
            date_joined: new Date(date_joined),
            accVerified: accVerified
        });

        const savedSponsor = await newSponsor.save();
        if(savedSponsor){
            res.status(200).send("sponsor saved successfully");
        }else{
            res.status(404).send("sponsor not saved successfully");
        }
    }catch(err){
        console.log("error creating a sponsor",err);
    }
});


//deleting a aponsor with a particular id
app.delete("/sponsors/delete/:sponsorId",async(req,res)=>{
    try{
        const{sponsorId}=req.params;
        const deleteSponsor= await Sponsor.findByIdAndDelete(sponsorId);
        if(!deleteSponsor){
            res.status(404).send("sponsor with particular id not found");
        }else{
            res.status(200).send("sponsor with the particular id deleted successfully");
        }
    }catch(err){
        res.status(500).send("error deleting the sponsor");
    }
});



//HOME PAGE
app.get("/",(req,res)=>{
    res.end("checking server use /chats to get chats result.");
});

app.listen(4000,()=>{
    console.log("server is listening");
});