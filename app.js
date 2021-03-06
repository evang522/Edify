

// Bring in modules
const express = require('express');
const app = express();
const logger = require('morgan');
const {PORT,DATABASE_URL} = require('./config');
const mongoose = require('mongoose');
const path = require('path');

// Define Routes
const prayerRouter = require('./routes/prayer.router');
const NeedsRouter = require('./routes/needs.router');
const userRouter = require('./routes/users.router');

// Set Middleware
app.use(express.json());
app.use(logger('common'));

// Declare Public Folder
app.use(express.static('public'));


// Mount Routes
app.use('/api', prayerRouter);
app.use('/api', NeedsRouter);
app.use('/api', userRouter);



// App-Wide Error Handler
app.use((err,req,res,next)=> {
  console.log(err.message);
  err.status = err.status || 500;
  err.message = (process.env.NODE_ENV === 'production') ? 'Something went wrong! We\'re working on addressing this Internal Server Error!' : err.message;
  res.json(err.message);
});



// Connect to DB
mongoose.connect(DATABASE_URL, () => {
  console.log('Connected to DB');
});

// Set App to listen 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});