const pool = require("../../config/db");
require('dotenv').config();

const getAllVenues = async (req, res) => {
    try {
        const query = `SELECT * FROM venues`;
        const { rows } = await pool.query(query); 
        res.status(200).json(rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};




module.exports = getAllVenues
