const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = require('./index');

const sequelize = require('./db/dbConnect');
const { User, Item } = require('./model/model');
const errorHandler = require('./middleware/errorHandler');

// import route
const rootRouter = require('./routes');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload());

const port = process.env.PORT || 3005;

app.use('/api', rootRouter);

// errorHandler
app.use(errorHandler);

const runServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, console.log(`server run on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

runServer();
