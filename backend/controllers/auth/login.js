const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    // Query user by username
    const result = await pool.query(
      'SELECT * FROM "user" WHERE user_name = $1',
      [user_name]
    );

    if (result.rows.length === 0) {
      console.log("No user found for username:", user_name);
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    // Clean inputs
    const cleanPassword = password.trim();
    const cleanHash = user.password.trim();

    // Compare passwords
    const passwordMatch = await bcrypt.compare(cleanPassword, cleanHash);


    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.user_name,
        role: user.role 
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstname: user.first_name,
        lastname: user.last_name,
        username: user.user_name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = login;
