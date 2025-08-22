const mongoose = require("mongoose");
const path = require('path');
const bookSeat = require(path.join(__dirname, '../models/booking.js'));
const ShowTime = require(path.join(__dirname, '../models/showtimes.js'));
const bookingmodel = require(path.join((__dirname, '../models/booking.js')))
const showTimemodel = require(path.join((__dirname, '../models/showtimes.js')))
const jwt = require("jsonwebtoken");

async function handleBooking(req,res){
    const {seats , showTime} = req.body;
    try {
      const jwtToken = req.cookies.token;
   const jwtKey = "3110$"; 
   const decodedToken = jwt.verify(jwtToken, jwtKey);
   const uuId = decodedToken.uuid;
  

      
      const seatDocs = seats.map(seatId => ({
    seatId: seatId,
    showTimeId: new mongoose.Types.ObjectId(showTime),
    userId:uuId

}));
  
        const bookedSeat = await bookSeat.insertMany(seatDocs);
  
    } catch (error) {
        
        res.status(500).send('Error booking seat');
    }
}

async function UpdateBookingPage(req,res){
  //updateAlreadyBookedSeats
  const showTimeId= req.query.showtimeId;
    let occupiedSeats = await bookingmodel.find({"showTimeId" : showTimeId });
   
    let occupiedSeat = occupiedSeats.map(element => element.seatId);
    
  //updateSeatsBookedByUser
   const jwtToken = req.cookies.token;
   const jwtKey = "3110$"; 
   const decodedToken = jwt.verify(jwtToken, jwtKey);
   const uuId = decodedToken.uuid;
  
  const bookedSeats = await bookingmodel.find({"showTimeId" : showTimeId, "userId": uuId});
  const bookedSeat = bookedSeats.map(element => element.seatId);


    let showTime = await showTimemodel.findById(showTimeId).populate("movie");
    
    res.render('book.hbs', {
        title : showTime.movie.title,
        img_url : showTime.movie.poster,
        genre : showTime.movie.genre,
        showTimeId : showTimeId,
        occupiedSeats: JSON.stringify(occupiedSeat),
        bookedSeats : JSON.stringify(bookedSeat),
        message : req.query.message
    });
}

module.exports = {handleBooking,UpdateBookingPage};