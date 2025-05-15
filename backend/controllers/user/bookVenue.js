// controllers/user/bookVenue.js
const pool = require('../../config/db');

const bookVenue = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, guest_count, booking_date } = req.body;

  if (!first_name || !last_name || !phone || !guest_count || !booking_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the date is already booked for this venue
    const existing = await pool.query(
      'SELECT * FROM bookings WHERE venue_id = $1 AND booking_date = $2',
      [id, booking_date]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Date already booked' });
    }

    // Insert new booking
    const query = `
      INSERT INTO bookings (venue_id, first_name, last_name, phone, guest_count, booking_date, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending')
      RETURNING *
    `;

    const { rows } = await pool.query(query, [
      id,
      first_name,
      last_name,
      phone,
      guest_count,
      booking_date
    ]);

    res.status(201).json({ message: 'Booking created', booking: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Booking failed' });
  }
};

module.exports = bookVenue;
