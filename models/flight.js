const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = {
  airport: {
    type: String,
    enum: ["DEN", "AUS", "DFW", "LAX", "SAN"],
  },
  arrival: {
    type: Date,
  },
};

const flightSchema = new Schema({
  airline: { type: String, enum: ["American", "Southwest", "United"] },
  airport: {
    type: String,
    enum: ["DEN", "AUS", "DFW", "LAX", "SAN"],
  },
  flightNo: {
    type: String,
    match: /^[1-9]\d{1,3}$/,
    required: true, // Regular expression for flight numbers between 10 and 9999
  },
  departs: {
    type: Number,
    default: function () {
      const currentYear = new Date().getFullYear();
      return currentYear + 1; // Default to one year after the current year
    },
  },
  destination: [destinationSchema],
});

module.exports = mongoose.model("Flight", flightSchema);
