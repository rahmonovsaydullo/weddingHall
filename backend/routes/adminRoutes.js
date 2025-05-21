const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../middlewares/uploadMiddleware")

// Import controllers
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

// Routes
router.post("/owners", createOwner); // ✅
router.get("/owners", getAllOwners); //✅

router.get("/venues", getAllVenues); //✅
router.post("/venues", uploadMiddleware, createVenues);// ✅
router.get("/venues/filter", filterVenue); // ✅
router.get("/venues/:id", viewVenue); //✅
router.put("/venues/:id", updateVenue);  //✅
router.delete("/venues/:id", deleteVenue);  // ✅

router.put("/venues/:id/approve", approveVenue);
router.put("/venues/:id/assign", assignOwner);

module.exports = router;
