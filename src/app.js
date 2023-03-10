'use strict'
const fileUpload = require('express-fileupload')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(fileUpload({preserveExtension: true}))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// conecta o banco
mongoose.connect('mongodb://127.0.0.1:27017/carolina-ribeiro-db');

// carrega os Models
const Product = require('./models/product');
// carrega as Rotas
const indexRoutes = require('./routes/index-routes')
const productRoutes = require('./routes/product-routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;