const pool = require("../../config/db");

const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    // 1. Tekshiramiz: bron mavjudmi va o'z to'yxonasigami
    const checkQuery = `
      SELECT b.id, v.user_id
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      WHERE b.id = $1
    `;
    const checkResult = await pool.query(checkQuery, [bookingId]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // ⚠️ Agar sizda `req.user.id` bo'lsa (auth qo'llanilgan bo'lsa), bu yerga solishtirish qo'shing:
    // if (checkResult.rows[0].user_id !== req.user.id) {
    //   return res.status(403).json({ error: "Access denied – not your venue" });
    // }

    // 2. O'chirish
    const deleteQuery = `DELETE FROM bookings WHERE id = $1`;
    await pool.query(deleteQuery, [bookingId]);

    res.status(200).json({ message: "Booking successfully deleted ✅" });
  } catch (error) {
    console.error("Error deleting booking by owner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = deleteBooking