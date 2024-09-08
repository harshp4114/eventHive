const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CmpnyName: { type: String, required: true },
  profilePic: { type: String, default: null },
  contact_person: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }
  },
  company_website: { type: String, default: null },
  bio: { type: String, default: "" },
  logo: { type: String, default: null },
  social_links: [{ type: String, default: null }],
  events_sponsored: [{
    event_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    sponsorship_amount: { type: Number, required: true },
    sponsorship_date: { type: Date, required: true }
  }],
  auctions_participated: [{
    event_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    bid_amount: { type: Number, required: true },
    bid_date: { type: Date, required: true },
    won: { type: Boolean, required: true }
  }],
  date_joined: { type: Date, required: true },
  accVerified: { type: Boolean, default: false }
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
