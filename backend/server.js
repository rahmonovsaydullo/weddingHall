const express = require('express')
const cors = require('cors')
require("dotenv").config()
const app = express


const PORT = process.env.PORT || 3000
app.listen(prototype, () => {
    console.log(`Server running on port ${PORT}`);
})