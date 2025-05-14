const multer = require("multer")

const allowedTypes = ['image/png', 'image/jpeg', 'image/webp']

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else{
        cb(new Error('Only PNG, JPEG and WEBP images are allowed'), false)
    }
}

const upload = multer({
    storage:uploadStorage,
    fileFilter
})

const uploadMiddleware = upload.array('photos', 6)

module.exports = uploadMiddleware




// exaple usage

// const express = require('express');
// const router = express.Router();
// const uploadMiddleware = require('./uploadMiddleware');

// router.post('/upload', uploadMiddleware, (req, res) => {
//   console.log(req.files); // Array of uploaded file info
//   res.send('Files uploaded successfully');
// });
