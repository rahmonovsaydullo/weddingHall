const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

const { registerUser } = require("../controllers/user/registerUser");
const { loginUser } = require("../controllers/user/login");
const getAllVenues = require("../controllers/user/getVanues");
const getVenue = require("../controllers/user/getVanue");
const bookVenue = require("../controllers/user/bookVenue");
const getUserBookings = require("../controllers/user/getOwnBookedVenues");
const { getBookedDates } = require("../controllers/user/bookedDates");


// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/venues", getAllVenues); 
router.get("/venues/:id", getVenue); 
router.get("/venues/:id/booked-dates", getBookedDates); 

// Protected routes
router.use(authentication);
router.use(checkRole(["user"]));
router.post("/venues/:id/book", bookVenue); 
router.get("/bookings", getUserBookings);

module.exports = router;
