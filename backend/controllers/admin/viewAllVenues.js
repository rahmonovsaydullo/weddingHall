const pool = require("../../config/db");
require('dotenv').config();

const getAllVenues = async (req, res) => {
    try {
        const query = `SELECT * FROM venue`;
        const { rows } = await pool.query(query); 
        res.status(200).json(rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

const getVenueById = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM venues WHERE id = $1`;
        const values = [id];
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Venue not found' });
        }

        res.status(200).json(rows[0]); // faqat bitta venue
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};


module.exports ={ getAllVenues, getVenueById};
