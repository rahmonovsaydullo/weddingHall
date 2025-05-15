// controllers/user/getVenueCalendar.js
const pool = require('../../config/db');

const getVenueCalendar = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT booking_date 
      FROM bookings 
      WHERE venue_id = $1 AND status = 'approved'
      ORDER BY booking_date ASC
    `;

    const { rows } = await pool.query(query, [id]);
    const bookedDates = rows.map(row => row.booking_date);

    res.json({ bookedDates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch calendar' });
  }
};

module.exports = getVenueCalendar;
