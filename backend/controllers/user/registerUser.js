const bcrypt = require('bcrypt');
const pool = require('../../config/db');

exports.registerUser = async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO users (full_name, email, password, role)
      VALUES ($1, $2, $3, 'user') RETURNING id, full_name, email, role;
    `;
    const values = [full_name, email, hashedPassword];
    const { rows } = await pool.query(insertQuery, values);

    res.status(201).json({ message: "User registered successfully!", user: rows[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
