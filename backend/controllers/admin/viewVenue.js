const pool = require("../../config/db");

exports.viewVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `SELECT * FROM venues WHERE id = $1`;
    const values = [id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Venue not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
