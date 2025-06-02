const express = require("express");
const router = express.Router();

// Middleware
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const checkRole = require("../middlewares/checkRole");

// Controllers

const deleteBooking = require("../controllers/owner/deleteBooking");
const createVenueByOwner = require("../controllers/owner/addVenue");
const getOwnerVenues = require("../controllers/owner/getOwnVenues");
const updateVenue = require("../controllers/owner/updateVanue");
const getVenueById = require("../controllers/owner/getVenue");
const getAllBookings = require("../controllers/owner/getVenuesBookings");
const cancelBooking = require("../controllers/owner/cancelBooking");


// Check role
router.use(checkRole(["owner"]));

// Get own venues
router.get("/venues", getOwnerVenues);
// POST /owner/venues – Add new venue
router.post("/venues", uploadMiddleware, createVenueByOwner);

// PUT /owner/venues/:id – Update venue details
router.put("/venues/:id", updateVenue);

// GET /owner/venues/:id – Get single venue
router.get("/venues/:id", getVenueById);

// GET /owner/venues/:id/bookings – Get bookings for a venue
router.get("/bookings", getAllBookings);

// Cancel booking
router.put("/bookings/:id/cancel", cancelBooking);

// DELETE /owner/bookings/:id – Cancel booking
router.delete("/bookings/:id", deleteBooking);

module.exports = router;