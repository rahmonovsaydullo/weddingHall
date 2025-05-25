const express = require("express");
const router = express.Router();

// middleware
const checkRole = require("../middlewares/checkRole")

const updateVenue = require("../controllers/owner/updateVanue");
const getVenuesBookings = require("../controllers/owner/getVenuesBookings");
const deleteBooking = require("../controllers/owner/deleteBooking");
const createVenueByOwner = require("../controllers/owner/addVenue");

// check role
router.use(checkRole(["owner"]));


// POST /owner/venues – Add new venue
router.post("/venues", createVenueByOwner);

// PUT /owner/venues/:id – Update venue details
router.put("/venues/:id", updateVenue);

// GET /owner/venues/:id/bookings – Get bookings for a venue
router.get("/venues/:id/bookings", getVenuesBookings);

// DELETE /owner/bookings/:id – Cancel booking
router.delete("/bookings/:id", deleteBooking);

module.exports = router;
