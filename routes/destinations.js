const express = require("express");
const router = express.Router();
const destinationCtrl = require("../controllers/destinations");

//allroutes in this file will start with '/' (root)
//POST /movies/:id/reviews

router.post("/flights/:id/destinations", destinationCtrl.create);

module.exports = router;
