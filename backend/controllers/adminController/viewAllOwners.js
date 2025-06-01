const pool = require('../../config/db');
require('dotenv').config();

const getAllOwners  = async (req, res) => {  
  try {
    const query = `
      SELECT id, first_name, last_name, user_name, role
      FROM "user"
      WHERE role = 'owner';
    `;
    const result = await pool.query(query);

    res.status(200).json({
      message: 'All owners list',
      owners: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

module.exports = getAllOwners;
