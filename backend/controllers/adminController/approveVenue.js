const pool = require('../../config/db');
require('dotenv').config();

const approveVenue = async (req, res) => {
    const { id } = req.params;


    try {
        const result = await pool.query(
            `UPDATE venues SET status = 'approved' WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Venue not found" });
        }

        res.status(200).json({
            message: "Venue approved successfully! ✅",
            approved_venue: result.rows[0],
        });
    } catch (error) {
        console.error('Error approving venue:', error);
        res.status(500).json({ error: "Internal server error while approving venue" });
    }
};

module.exports = approveVenue;
