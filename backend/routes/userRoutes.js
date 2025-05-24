const express = require("express");
const router = express.Router();


const { registerUser } = require("../controllers/user/registerUser");
const { loginUser } = require("../controllers/user/login");
const getAllVenues = require("../controllers/user/getVanues");
const getVenue = require("../controllers/user/getVanue");
const getVenueCalendar = require("../controllers/user/getVenueCalendar");
const bookVenue = require("../controllers/user/bookVenue");
const getUserBookings = require("../controllers/user/getOwnBookedVenues");
const { getBookedDates } = require("../controllers/user/bookedDates");

// check role
adminRoute.use(checkRole(["user"]));


// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Venues
router.get("/venues", getAllVenues); // only approved venues with filters
router.get("/venues/:id", getVenue)
router.get("/venues/:id/calendar", getVenueCalendar);
router.post("/venues/:id/book", bookVenue);
router.get("/venues/:id/booked-dates", getBookedDates);

// Bookings
router.get("/bookings", getUserBookings);

module.exports = router;
