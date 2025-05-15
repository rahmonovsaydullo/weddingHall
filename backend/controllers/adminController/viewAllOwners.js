const pool = require('../../config/db');
require('dotenv').config();

const getAllOwners  = async (req, res) => {  
  try {
    const query = `
      SELECT id, firstname, lastname, username, role
      FROM users
      WHERE role = 'owner';
    `;
    const result = await pool.query(query);

    res.status(200).json({
      message: 'All owners list',
      teachers: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

module.exports = getAllOwners;
