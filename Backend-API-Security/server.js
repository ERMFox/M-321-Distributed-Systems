// server.js
const express = require('express');
const config = require('./config/config.js');
const bodyParser = require('body-parser');
const userRouter = require('./Routers/userRouter');
const productRouter = require('./Routers/productRouter');
const companyRouter = require('./Routers/companyRouter');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/companies', companyRouter);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html2-client-generated/index.html');
});
