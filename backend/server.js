const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", require("./routes/adminRoutes"));
app.use("/owner", require("./routes/ownerRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



