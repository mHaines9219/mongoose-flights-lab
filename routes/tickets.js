const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/tickets");

// Routes for purchasing tickets for a specific flight
router.get("/:id", ticketCtrl.show);

router.post("/:id", ticketCtrl.create);

module.exports = router;

// "/flights/<%= flight._id %>/tickets/new";
