const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  create,
  show,
};

async function create(req, res) {
  console.log("ticket bought");
  console.log(req.body);
  try {
    // Find the flight by ID
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).render("error", { errorMsg: "Flight not found" });
    }

    // Create a new ticket
    const newTicket = new Ticket({
      seat: req.body.seat,
      price: req.body.price,
      flight: flight._id, // Link ticket to flight
    });

    // Save the ticket
    await newTicket.save();

    // Associate the ticket with the flight
    flight.tickets.push(newTicket);
    await flight.save();

    // Redirect to the flights page or another success page
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { errorMsg: "Failed to add ticket" });
  }
}

async function show(req, res) {
  console.log("PURCHASE TICKET link clicked!"); // Add this log statement

  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.render("error", { errorMsg: "Flight not found" });
    }
    res.render("flights/ticket", { flight });
  } catch (err) {
    console.log(err);
    res.render("error", { errorMsg: "Failed to retrieve flight" });
  }
}
