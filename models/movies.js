const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cinemaDB').then(() => {
  
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  poster: String
});

const movies = new mongoose.model("movies", movieSchema );

module.exports = movies;