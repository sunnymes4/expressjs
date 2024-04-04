const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Route for Register

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "User already Exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;

    const newUser = await User(req.body);
    await newUser.save(); // saves the data in the database

    res.send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async (req, res) => {

    try {

        const body = req.body;

        const user = await User.findOne({email: body.email});
        
        console.log(user);

        if(!user) {
            return res.send({
                success: false,
                message: 'Email dose not exists, please enter correct email'
            })
        }

        const passwordMatch = await bcrypt.compare(
            body.password,
            user.password
        );

        console.log(passwordMatch)

        if(!passwordMatch) {
            return res.send({
                success: false,
                message: 'Invalid Password, please enter the correct password'
            })
        }

        const token = jwt.sign({userId: user._id}, `${process.env.SECRET_KEY}`, {expiresIn: '1d'});

        return res.send({
            success: true,
            message: 'User Successfully Logged In',
            token: token
        })

    } catch(err) {
        console.log(err);
    }
    
})

module.exports = router;