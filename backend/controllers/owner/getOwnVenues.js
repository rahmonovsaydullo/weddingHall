import pool from '../../config/db.js';

const getOwnerVenues = async (req, res) => {
  const ownerId = req.user.id; 
  try {
    const query = `
      SELECT * FROM venues
      WHERE owner_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [ownerId]);

    res.status(200).json({
      venues: result.rows,
    });
  } catch (error) {
    console.error("Error fetching owner's venues:", error);
    res.status(500).json({ error: "Failed to fetch venues" });
  }
};

export default  getOwnerVenues;
