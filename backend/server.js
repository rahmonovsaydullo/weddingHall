const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // optional, if you use CORS

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
