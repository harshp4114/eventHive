const express=require('express');
const router=express.Router();
const { getAllSponsors, getSponsorById, createSponsor, deleteSponsor } = require('../controllers/sponsor.js');

//fetching all the sponsors 
router.get("/",getAllSponsors);

//fetching a particular sponsor with id
router.get("/:sponsorId",getSponsorById);


//adding a sponsor
router.post("/",createSponsor);


//deleting a aponsor with a particular id
router.delete("/delete/:sponsorId",deleteSponsor);

module.exports=router;