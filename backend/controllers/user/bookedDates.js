import pool from '../../config/db.js';

const getBookedDates = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT reservation_date FROM booking WHERE venue_id = $1",
      [id]
    );

    const dates = result.rows.map((row) =>
      row.reservation_date.toISOString().split("T")[0]
    );

    res.status(200).json({ bookedDates: dates });
  } catch (err) {
    console.error("Error fetching booked dates:", err);
    res.status(500).json({ message: "Failed to load booked dates" });
  }
};

export default  getBookedDates
