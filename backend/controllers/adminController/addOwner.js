const bcrypt = require('bcrypt')
const pool = require("../../config/db");

const createOwner = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, phone, role)
      VALUES ($1, $2, $3, $4, 'owner')
      RETURNING id, name, email, phone, role
    `;
    const values = [name, email, hashedPassword, phone];

    const result = await pool.query(query, values);
    res.status(201).json({
      message: "Owner created successfully",
      owner: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = createOwner