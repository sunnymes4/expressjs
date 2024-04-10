const express = require('express');

const router = express.Router();

const Theater = require('../models/theaterModel');

const authMiddleware = require('../middleware/authMiddleware');

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

router.post('/get-theaters-by-owner', async (req, res) => {
    try {
        const theaters = await Theater.find({ owner: req.body.owner });
        console.log(theaters, '**************** fetching theaters for loggedin owner');
        res.send({
            success: true,
            data: theaters,
            message: 'All Theaters under your name are fetched'
        })
    } catch(err) {
        res.send({
            success: false,
            message: err.message
        })
    }
    
})

router.put('/update-theater', async(req, res) => {
    try {
        await Theater.findByIdAndUpdate(req.body.theaterId, req.body);

        res.send({
            success: true,
            message: 'Theater updated successfully'
        })
    } catch(err) {
        res.send({
            success: false,
            message: err.message
        })
    }
});

router.delete('/delete-theater', async(req, res) => {
    try {
        await Theater.findByIdAndDelete(req.body.theaterId);

        res.send({
            success: true,
            message: 'Theater deleted successfully'
        })
    } catch(err) {
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;