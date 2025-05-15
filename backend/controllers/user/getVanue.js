
const pool = require('../../config/db');

const getVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `SELECT * FROM venues WHERE id = $1 AND status = 'approved'`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getVenue;
