const pool = require('../../config/db');

const getUserBookings = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const query = `
      SELECT b.id, b.booking_date, b.status, b.guest_count, 
             v.name AS venue_name, v.address
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      WHERE b.user_id = $1
      ORDER BY b.booking_date DESC
    `;

    const { rows } = await pool.query(query, [userId]);
    res.json({ bookings: rows });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

module.exports = getUserBookings;
