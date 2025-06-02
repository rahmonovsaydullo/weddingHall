const pool = require("../../config/db");

const getAllBookings = async (req, res) => {
  const ownerId = req.user.id; // make sure `checkRole` middleware attaches `req.user`

  const { sort = 'b.date', order = 'asc' } = req.query;

  const validSortColumns = {
    reservation_date: 'b.reservation_date',
    venue_name: 'v.name',
    district: 'd.name',
    status: 'b.status',
  };

  const sortColumn = validSortColumns[sort] || 'b.date';
  const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

  try {
    const query = `
      SELECT 
        b.id,
        b.reservation_date,
        b.status,
        b.guest_amount,
        b.first_name,
        b.phone_number,
        v.name AS venue_name,
        d.name AS district_name
      FROM booking b
      INNER JOIN venues v ON b.venue_id = v.id
      INNER JOIN district d ON v.district_id = d.id
      WHERE v.owner_id = $1
      ORDER BY ${sortColumn} ${sortOrder}
    `;

    const result = await pool.query(query, [ownerId]);

    res.status(200).json({ bookings: result.rows });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllBookings;
