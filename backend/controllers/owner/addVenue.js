const pool = require("../../config/db");

const createVenueByOwner = async (req, res) => {
  const { name, address, seat_price, phone_number, user_id, district } = req.body;

  // Check for required fields
  if (!name || !address || !seat_price || !phone_number || !user_id || !district) {
    return res.status(400).json({ error: "Missing required fields to create venue" });
  }

  try {
    const query = `
      INSERT INTO venues (name, address, seat_price, phone_number, status, user_id, district)
      VALUES ($1, $2, $3, $4, 'pending', $5, $6)
      RETURNING *;
    `;

    const values = [name, address, seat_price, phone_number, user_id, district];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Venue created successfully and is pending approval 🎉",
      venue: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports  = createVenueByOwner