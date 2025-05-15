const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query user by username
    const result = await pool.query(
      `SELECT * FROM "user" WHERE user_name = $1`,
      [username]
    );

    // If no user found, return error before accessing user data
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    console.log("User lookup result:", user);
    console.log("Password from request:", password);
    console.log("Hashed password from DB:", user.password);

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return success response
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
    res.status(500).send("Server error occurred");
  }
};

module.exports = login;
