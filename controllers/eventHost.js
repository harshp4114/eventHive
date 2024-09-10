const eventHost=require('../models/eventHost.js');

// async function getAllEventHost(req,res) {
//     try{
//         const hosts = await eventHost.find();
//         if(hosts.length==0){
//             res.status(404).send("no sponsors present");
//         }else{
//         res.status(200).json(hosts);
//         }
//     }catch (err){
//         console.log("error retrieving sponsors",err);
//     }
// }

// module.exports={
//     getAllEventHost,
// }