// controllers/user/getVenues.js
const pool = require('../../config/db');

const getAllVenues = async (req, res) => {
  const { price, capacity, district, search } = req.query;

  try {
    let query = `SELECT * FROM venues WHERE status = 'approved'`;
    let params = [];
    let conditions = [];

    if (price) {
      conditions.push(`seat_price <= $${params.length + 1}`);
      params.push(price);
    }
    if (capacity) {
      conditions.push(`capacity >= $${params.length + 1}`);
      params.push(capacity);
    }
    if (district) {
      conditions.push(`district = $${params.length + 1}`);
      params.push(district);
    }
    if (search) {
      conditions.push(`LOWER(name) LIKE $${params.length + 1}`);
      params.push(`%${search.toLowerCase()}%`);
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getAllVenues;
