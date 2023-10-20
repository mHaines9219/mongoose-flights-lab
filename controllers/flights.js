const Flight = require("../models/flight");

module.exports = {
  new: newFlight,
  create,
  index,
};
function newFlight(req, res) {
  res.render("flights/new", { errorMsg: "404" });
}
async function create(req, res) {
  // Retrieve form data from the request
  const { airline, airport, flightNo, departs } = req.body;

  // Create a new Flight instance
  const newFlight = new Flight({
    airline,
    airport,
    flightNo,
    departs,
  });

  try {
    // Save the new Flight instance to the database
    await newFlight.save();
    // Flight creation was successful
    res.redirect("/flights");
  } catch (err) {
    // Handle the error, e.g., by rendering an error page or redirecting to the "new" view with an error message
    res.render("flights/new", { errorMsg: "Failed to create a new flight" });
  }
}

async function index(req, res) {
  const flights = await Flight.find({});
  res.render("flights", { flights });
}
