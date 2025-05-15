const pool = require("../../config/db");

const getBookingsByVenue = async (req, res) => {
  const venueId = req.params.id;

  try {
    const query = `
      SELECT b.id, b.full_name, b.phone_number, b.guest_count, b.date, b.status, b.created_at
      FROM bookings b
      INNER JOIN venues v ON b.venue_id = v.id
      WHERE v.id = $1
      ORDER BY b.date ASC;
    `;

    const values = [venueId];
    const result = await pool.query(query, values);

    res.status(200).json({
      venue_id: venueId,
      bookings: result.rows,
    });
  } catch (error) {
    console.error("Error fetching bookings by venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports =  getBookingsByVenue