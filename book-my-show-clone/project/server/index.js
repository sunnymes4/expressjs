const express = require("express");
require('dotenv').config();

const mongoose = require("mongoose");

const app = express();

const PORT = 5003;

const userRoutes = require('./routes/userRoute')

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users' , userRoutes )

mongoose
.connect('mongodb+srv://sunnymes4:Su9ynKDUSyd9rWVa@cluster0.crkylq1.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("DB connected"))
.catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log("Server Started");
});