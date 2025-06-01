const express = require("express");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use("/admin", require("./routes/adminRoutes"));
app.use("/owner", require("./routes/ownerRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



