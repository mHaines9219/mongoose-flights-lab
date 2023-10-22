const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seat: { type: String, match: /[A-F][1-9]\d?/ },
  price: Number,
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight", // Reference to the 'Flight' model for population
    required: true,
  },
});
module.exports = mongoose.model("Ticket", ticketSchema);
