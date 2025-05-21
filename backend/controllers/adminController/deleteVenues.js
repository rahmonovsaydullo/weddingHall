const pool = require('../../config/db');

const deleteVenue = async (req, res) => {
    const {id} = req.params;
    const { owner_id } = req.body;

    console.log("Trying to delete venue:", id, "with owner_id:", owner_id);

    try {
        const result = await pool.query(
            `SELECT * FROM venues WHERE id = $1 AND owner_id = $2`,
            [id, owner_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Venue not found or unauthorized" });
        }

        await pool.query(`DELETE FROM venues WHERE id = $1`, [id]);
        res.status(200).json({ message: "Venue deleted successfully ✅" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = deleteVenue;
