const mongoose = require('mongoose');
const config = require('./config');

require('./models');

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true
}, (err) => {
  if (err) throw err;
  console.log("[LOG] Connection to MongoDB database established.");
});