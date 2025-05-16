const pool = require('../../config/db');
require('dotenv').config();

const createVenues = async (req, res) => {
    const { name, address, seat_price, capacity, phone_number, owner_id, district } = req.body;

    if (!name || !address || !seat_price || !phone_number || !owner_id || !district) {
        return res.status(400).json({ error: "Missing required fields, error with creating venue" });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insert venue
        const insertVenueQuery = `
        INSERT INTO venues (name, address, seat_price, capacity, phone_number, owner_id, district, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
        `;
        const venueValues = [name, address, seat_price, capacity, phone_number, owner_id, district, 'approved'];

        const venueResult = await client.query(insertVenueQuery, venueValues);
        const venueId = venueResult.rows[0].id;

        // Insert images
        const files = req.files;
        if (files && files.length > 0) {
            const insertImageQuery = `
                INSERT INTO images (venue_id, image_path)
                VALUES ($1, $2)
            `;

            for (const file of files) {
                await client.query(insertImageQuery, [venueId, file.filename]);
            }
        }

        await client.query('COMMIT');

        res.status(201).json({
            message: 'Venue and images created successfully! 🎉',
            venue_id: venueId,
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: "Internal server error while creating venue and images" });
    } finally {
        client.release();
    }
};

module.exports = createVenues;
