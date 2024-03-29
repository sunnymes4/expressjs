const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send('This is my home page')
})


app.get('/about', (req, res) => {
    return res.send('This is my about page')
})


app.get('/products', (req, res) => {
    return res.send('This is my products page '+ req.query.shoes)
})


app.listen(8002, () => {
    console.log('Server is running on port 8002')
})