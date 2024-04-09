const express = require('express');

const router = express.Router();

const Theater = require('../models/theaterModel');

router.post('/add-theater', async (req, res) => {
    try {
        const newTheater = new Theater(req.body);
        await newTheater.save();
    
        res.send({
            success: true,
            message: 'New theater is added'
        })
    } catch(err) {
        res.send({
            success: false,
            message: err.message
        })
    }
   
});

module.exports = router;