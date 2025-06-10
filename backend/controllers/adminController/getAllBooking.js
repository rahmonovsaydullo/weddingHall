const pool = require('../../config/db');

const getAllBookings = async (req, res) => {
  try {
    const { sort = 'reservation_date', order = 'asc' } = req.query;

    const sortColumns = {
      reservation_date: 'b.reservation_date',
      venue_name: 'v.name',
      district_name: 'd.name',
      status: 'b.status',
    };

    const sortColumn = sortColumns[sort] || 'b.reservation_date';
    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const query = `
      SELECT 
        b.id,
        v.name AS venue_name,
        d.name AS district_name,
        b.reservation_date,
        b.guest_amount,
        b.first_name,
        b.last_name,
        b.phone_number,
        b.status
      FROM booking b
      JOIN venues v ON b.venue_id = v.id
      JOIN district d ON v.district_id = d.id
      ORDER BY ${sortColumn} ${sortOrder};
    `;

    const result = await pool.query(query);
    res.status(200).json({ bookings: result.rows });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getAllBookings;
