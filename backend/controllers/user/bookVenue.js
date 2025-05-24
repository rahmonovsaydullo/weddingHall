const pool = require('../../config/db');

const bookVenue = async (req, res) => {
  const { id } = req.params;
  const {
    guest_amount,
    reservation_date,
    first_name,
    last_name,
    phone_number,
  } = req.body;

  if (!guest_amount || !reservation_date || !first_name || !last_name || !phone_number) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM booking WHERE venue_id = $1 AND reservation_date = $2',
      [id, reservation_date]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Date already booked' });
    }

    const query = `
      INSERT INTO booking (venue_id, guest_amount, reservation_date, status, first_name, last_name, phone_number)
      VALUES ($1, $2, $3, 'booked', $4, $5, $6)
      RETURNING *
    `;

    const { rows } = await pool.query(query, [
      id,
      guest_amount,
      reservation_date,
      first_name,
      last_name,
      phone_number,
    ]);

    res.status(201).json({ message: 'Booking created', booking: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Booking failed' });
  }
};

module.exports = bookVenue;
