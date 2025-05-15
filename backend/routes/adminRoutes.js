const express = require("express");
const router = express.Router();

// Import each controller
const approveVenue = require("../controllers/adminController/approveVenue");
const assignOwner = require("../controllers/adminController/assignOwner");
const createVenues = require("../controllers/adminController/createVenues");
const viewVenue = require("../controllers/adminController/viewVenue");
const createOwner = require("../controllers/adminController/addOwner");
const deleteVenue = require("../controllers/adminController/deleteVenues");
const filterVenue = require("../controllers/adminController/filterVenues");
const getAllOwners = require("../controllers/adminController/viewAllOwners");
const getAllVenues = require("../controllers/adminController/viewAllVenues");
const updateVenue = require("../controllers/adminController/updateVenue");

// Define routes
router.post("/owners", createOwner); // POST /admin/owners
router.get("/owners", getAllOwners); // GET /admin/owners

router.get("/venues", getAllVenues); // GET /admin/venues
router.post("/venues", createVenues); // POST /admin/venues
router.get("/venues/filter", filterVenue); // Optional filter route
router.get("/venues/:id", viewVenue); // GET /admin/venues/:id
router.put("/venues/:id", updateVenue); // PUT /admin/venues/:id
router.delete("/venues/:id", deleteVenue); // DELETE /admin/venues/:id

router.put("/venues/:id/approve", approveVenue); // PUT /admin/venues/:id/approve
router.put("/venues/:id/assign", assignOwner); // PUT /admin/venues/:id/assign

module.exports = router;
