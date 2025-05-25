const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

const { registerUser } = require("../controllers/user/registerUser");
const { loginUser } = require("../controllers/user/login");
const getAllVenues = require("../controllers/user/getVanues");
const getVenue = require("../controllers/user/getVanue");
const getVenueCalendar = require("../controllers/user/getVenueCalendar");
const bookVenue = require("../controllers/user/bookVenue");
const getUserBookings = require("../controllers/user/getOwnBookedVenues");
const { getBookedDates } = require("../controllers/user/bookedDates");


// ✅ Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/venues", getAllVenues); // make public
router.get("/venues/:id", getVenue); // make public
router.get("/venues/:id/calendar", getVenueCalendar); // make public
router.get("/venues/:id/booked-dates", getBookedDates); // make public if needed

// ✅ Protected routes
router.use(authentication);
router.use(checkRole(["user"]));

router.post("/venues/:id/book", bookVenue); // only this is protected
router.get("/bookings", getUserBookings);

module.exports = router;
