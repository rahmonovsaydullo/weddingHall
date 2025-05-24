const pool = require("../../config/db");
require('dotenv').config();

const getAllVenues = async (req, res) => {
    try {
        const query = `
        SELECT 
  v.id,
  v.name,
  v.address,
  v.seat_price,
  v.capacity,
  v.phone_number,
  v.status,
  d.name AS district,
  (
    SELECT i.image_path
    FROM images i
    WHERE i.venue_id = v.id
    ORDER BY i.id
    LIMIT 1
  ) AS preview_image
FROM venues v
LEFT JOIN district d ON v.district_id = d.id
WHERE v.status IN ('approved', 'pending', 'booked');
 `;
        const { rows } = await pool.query(query); 
        res.status(200).json(rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};




module.exports = getAllVenues
