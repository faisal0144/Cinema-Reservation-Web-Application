
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cinemaDB').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role : String
});

const User = mongoose.model('User', userSchema);



module.exports = User