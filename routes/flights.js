var express = require("express");
var router = express.Router();

const flightCtrl = require("../controllers/flights");
const flights = require("../controllers/flights");

/* GET users listing. */
router.get("/new", flightCtrl.new);
router.get("/", flightCtrl.index);
router.post("/", flightCtrl.create);
router.get("/:id", flightCtrl.show);

module.exports = router;
