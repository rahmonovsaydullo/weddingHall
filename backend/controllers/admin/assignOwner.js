const express = require("express");
require("dotenv").config();
const pool = require('../../config/db')

// Assign owner to a venue
exports.assignOwner = async (req, res) => {
  const venueId = req.params.id;
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing owner user_id" });
  }

  try {
    // Optional: check if user exists and is of role 'owner'
    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1 AND role = 'owner'", [user_id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "Owner user not found or invalid role" });
    }

    // Update venue with new owner
    const result = await pool.query(
      "UPDATE venues SET user_id = $1 WHERE id = $2 RETURNING *",
      [user_id, venueId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Venue not found" });
    }

    res.status(200).json({
      message: "Owner assigned to venue successfully",
      venue: result.rows[0],
    });
  } catch (error) {
    console.error("Error assigning owner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
