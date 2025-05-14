const express = require("express");
const cors = require("cors");
const pool = require('../../config/db')

const app = express();
app.use(cors());
app.use(express.json());



exports.filterWeddinghall = async (req, res) => {
    const { sortBy } = req.query;

    try {
        let query = "SELECT * FROM students";

        // Buyerda tanlangan sorovga qarab talabalarni filtirlash uchun postgresql ga sorov yuboriladi
        if (sortBy === "price") {
            query += " ORDER BY name ASC"; 
        }  else if (sortBy === "capacity") {
            query += " ORDER BY grade DESC"; 
        } else if (sortBy === "district") {
            query += " ORDER BY grade DESC"; 
        }else if (sortBy === "status") {
            query += " ORDER BY grade DESC"; 
          }

        // Ma'lumotlar bazasidan so'rovni bajarish
        const result = await pool.query(query);
        res.status(200).json(result.rows); // Natijalarni JSON formatida qaytarish
    } catch (error) {
        console.error("Error fetching wedding halls:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
