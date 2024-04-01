const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());

app.listen(8002, () => {
    console.log('Server is running on port 8002')
})

mongoose.connect('mongodb+srv://sunnymes4:2KmizeE5WNcG2g0W@cluster0.sffx4kw.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
        console.log(err)
    })

// Schema for product - Mongoose

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ProductModel = mongoose.model('products', productSchema);

// Create a DB entry

app.post('/api/products', async (req, res) => {
    const body = req.body;

    const product = await ProductModel.create({
        product_name: body.product_name,
        product_price: body.product_price,
        isInStock: body.isInStock,
        category: body.category
    })

    console.log(product);

    return res.status(201).json({message: 'Product Created!'})

})

app.get('/products', async (req, res) => {
    const products = await ProductModel.find({})
    const html = `<ul> ${products.map((product) => `<li>${product.product_name}</li>`
    )}</ul>`;

    return res.send(html)
})

app.get('/api/products/:id', async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    
    console.log(product)
    return res.status(200).json({productInfo: product});
})

app.put('/api/products/:id', async (req, res) => {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body)

    return res.status(201).json({message: "Product Updated"});
})


app.delete('/api/products/:id', async (req, res) => {
    await ProductModel.findByIdAndDelete(req.params.id)

    return res.status(201).json({message: "Product Deleted"});
})


// app.get('/about', (req, res) => {
//     return res.send('This is my about page')
// })


// app.get('/products', (req, res) => {
//     return res.send('This is my products page '+ req.query.shoes)
// })


