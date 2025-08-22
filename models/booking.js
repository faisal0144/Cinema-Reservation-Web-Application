const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinemaDB').then(() => {
  
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
const bookingSchema = new mongoose.Schema({
    title : String,
    seatId: String,
    showTimeId:{type: mongoose.Schema.Types.ObjectId, ref:"showtimes"},
    userId : String
});

const bookSeat = mongoose.model('bookedSeats',bookingSchema);

module.exports = bookSeat;