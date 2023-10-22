const Flight = require("../models/flight");

module.exports = {
  new: newFlight,
  create,
  index,
  show,
  update,
};
function newFlight(req, res) {
  res.render("flights/new", { errorMsg: "404" });
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id)
      .populate("tickets")
      .populate("destination");
    res.render("flights/show", { airport: "Flight Airport", flight });
  } catch (error) {
    // Handle any errors, e.g., by rendering an error page or redirecting to a relevant route
    res.render("error", { errorMsg: "Failed to retrieve flight details" });
  }
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
  try {
    // Use Mongoose's populate to fetch flights with populated destinations
    const flights = await Flight.find({}).populate("destination");
    console.log(flights);

    res.render("flights", { flights });
  } catch (error) {
    // Handle any errors, e.g., by rendering an error page or redirecting to a relevant route
    res.render("error", { errorMsg: "Failed to retrieve flight list" });
  }
}

async function update(req, res) {
  try {
    const flightId = req.params.id;
    const updateData = req.body; // Assuming the data to update includes destination

    // Find the flight by ID and update it in the database
    const updatedFlight = await Flight.findByIdAndUpdate(flightId, updateData, {
      new: true,
    });

    // Redirect to the flight details page after the update
    console.log(req.body);
    res.redirect(`/flights/${updatedFlight._id}`);
  } catch (err) {
    // Handle the error, e.g., by rendering an error page or redirecting to the "new" view with an error message
    res.render("flights/new", { errorMsg: "Failed to update the flight" });
  }
}
