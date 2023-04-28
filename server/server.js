const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// entities routers
const userRouter = require('./routers/userRouter');

require('dotenv').config();

// setup server middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

// apply entities routers
app.use('/users', userRouter);

// setup server connection
const port = process.env.PORT || 4000;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@bookscluster.11qp5ho.mongodb.net/?retryWrites=true&w=majority`,
    );
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
