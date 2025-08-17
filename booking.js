const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinemaDB').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
const bookingSchema = new mongoose.Schema({
    title : String,
    seatId: String,
    slug: String
});

const bookSeat = mongoose.model('bookedSeats',bookingSchema);

module.exports = bookSeat;