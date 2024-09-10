const Sponsor=require('../models/sponsor.js');

async function getAllSponsors(req,res) {
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
}

async function getSponsorById(req,res) {
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
}

async function createSponsor(req,res) {
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
}

async function deleteSponsor(req,res) {
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
}


module.exports={
    getAllSponsors,
    getSponsorById,
    createSponsor,
    deleteSponsor,
};