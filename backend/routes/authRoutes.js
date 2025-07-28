import express from 'express'
import login  from "../controllers/auth/login.js"
const router = express.Router();


// POST /login
router.post("/login", login);

export default  router;
