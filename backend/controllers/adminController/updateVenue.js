const pool = require('../../config/db');
require('dotenv').config();

const updateVenue = async (req, res) => {
    const { id } = req.params;
    const { name, address, seat_price,capacity, phone_number, status, owner_id, district } = req.body;

    try {
        const query = `
        UPDATE venues 
        SET name = $1, 
            address = $2, 
            seat_price = $3, 
            capacity = $4,
            phone_number = $5, 
            status = $6, 
            owner_id = $7,
            district = $8,
            updated_at = NOW()
        WHERE id = $9
        RETURNING *`;

        const values = [name, address, seat_price, capacity, phone_number, status, owner_id, district, id];
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
