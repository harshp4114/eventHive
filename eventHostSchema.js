const mongoose = require("mongoose");

const auctionBidSchema = new mongoose.Schema({
    sponsor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor', default: null },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true }
});

const auctionDetailsSchema = new mongoose.Schema({
    bids: [auctionBidSchema],
    minAmount: { type: Number, required: true },
    auctionStart: { type: Date, required: true },
    auctionEnd: { type: Date, required: true },
    winningBid: {
        sponsor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor', default: null },
        amount: { type: Number, required: true }
    }
});

const eventSchema = new mongoose.Schema({
    E_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    startingDate: { type: Date, required: true },
    endingDate: { type: Date, required: true },
    description: { type: String, default: null },
    photos: [{ type: String, default: null }],
    numOfSponsors: { type: Number, required: true },
    doAuction: { type: Boolean, required: true },
    auctionDetails: auctionDetailsSchema
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orgName: { type: String, required: true },
    profile_pic: { type: String, default: null },
    bio: { type: String, default: null },
    accVerified: { type: Boolean, default: false },
    events: [eventSchema]
});

const Eventhost = mongoose.model("EventHost", eventHostSchema);

module.exports = Eventhost;
