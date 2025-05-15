const pool = require('../../config/db');
require('dotenv').config();

const updateVenue = async (req, res) => {
    const { id } = req.params;
    const { name, address, seat_price, phone_number, status, user_id, district } = req.body;

    if (!name || !address || !seat_price || !phone_number || !status || !user_id || !district) {
        return res.status(400).json({ error: "Missing required fields, error with updating venue" });
    }

    try {
        const query = `
        UPDATE venues 
        SET name = $1, 
            address = $2, 
            seat_price = $3, 
            phone_number = $4, 
            status = $5, 
            user_id = $6,
            district = $7
        WHERE id = $8
        RETURNING *`;

        const values = [name, address, seat_price, phone_number, status, user_id, district, id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Venue not found" });
        }

        res.status(200).json({
            message: 'Venue updated successfully! ✅',
            updated_venue: result.rows[0],
        });
    } catch (error) {
        console.error('Error updating venue:', error);
        res.status(500).json({ error: "Internal server error. On updating venue" });
    }
};

module.exports = updateVenue;
