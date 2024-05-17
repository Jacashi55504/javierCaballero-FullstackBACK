const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const cors = require('cors');

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pedidos', require('./routes/pedidoRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.yellow));
