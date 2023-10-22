const Flight = require("../models/flight");

module.exports = {
  create,
};

async function create(req, res) {
  //get the movie by ID
  const flight = await Flight.findById(req.params.id);
  // push body of review to reviews array
  flight.destination.push(req.body);
  try {
    //save any changes made to movie doc
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  //respond to request, redir if save succesfull
  res.redirect(`/flights/${flight._id}`);
}
