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

router.get("/venues", getOwnerVenues);
router.get("/venues/:id", getVenueById);
router.get("/bookings", getAllBookings);

router.post("/venues", uploadMiddleware, createVenueByOwner);

router.put("/venues/:id", updateVenue);
router.put("/bookings/:id/cancel", cancelBooking);

router.delete("/bookings/:id", deleteBooking);

module.exports = router;