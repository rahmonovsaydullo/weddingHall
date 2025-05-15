
const pool = require('../../config/db')
require('dotenv').config();



const createVenues = async (req, res) => {
    const { name, address, seat_price, phone_number, status, user_id, district } = req.body;

    if (!name || !address || !seat_price || !phone_number || !status || !user_id || !district) {
        return res.status(400).json({ error: "Missing required fields, error with creating venue" });
    }

    try {
        const query = `
    INSERT INTO venues (name, address, seat_price, phone_number, status, user_id, district)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`

        const values = [name, address, seat_price, phone_number, status, user_id, district];
        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Venue created successfully!🎉',
            wedding_hall: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error. On creating venue" })
    }
}

module.exports = createVenues