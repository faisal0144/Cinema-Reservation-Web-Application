const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinemaDB').then(() => {
 
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
const showtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movies" },
    time: String,
    date: String
});

const showtime = mongoose.model('showtimes',showtimeSchema);

module.exports = showtime;