// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URL, connectionParams } = require("./src/config/config.js");
const bodyParser = require('body-parser');
userRoutes = require('./src/routes/users-routes.js');
courseRoutes = require('./src/routes/courses-routes.js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
mongoose.connect(MONGO_URL, connectionParams)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use('/user' , userRoutes)
app.use('/course' , courseRoutes)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
