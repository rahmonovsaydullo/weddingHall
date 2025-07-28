import pool from '../../config/db.js';

const cancelBooking = async (req, res) => {
  const { id } = req.params; 

  try {
    const result = await pool.query(
      `UPDATE booking SET status = 'cancelled' WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
      cancelledBooking: result.rows[0],
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: "Internal server error while cancelling booking" });
  }
};

export default  cancelBooking;
