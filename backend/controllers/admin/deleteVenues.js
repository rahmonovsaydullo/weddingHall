const pool = require('../../config/db');

const deleteWeddinghallFromWeddingHall = async (req, res) => {
    const wedding_hall_id = req.wedding_hall_id
    const { owner_id } = req.body

    try {
        const result = await pool.query(`
            SELECT * FROM wedding_hall WHERE id = $1 and owner_id = $2`, 
            [wedding_hall_id, owner_id])
            
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = deleteWeddinghallFromWeddingHall