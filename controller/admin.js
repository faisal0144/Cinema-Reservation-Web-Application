const path = require("path");
const movieModel = require(path.join(__dirname,'../models/movies.js'));
const showtimeModel = require(path.join(__dirname,'../models/showtimes.js'));
const bookingModel = require(path.join(__dirname,'../models/booking.js'));
async function addMovie(req,res){
 const {title, genre, poster} = req.body;

const addedMovie = await movieModel.create({
    title: title,
     genre: genre,
     poster: poster
 })

 res.render ('addMovie', {
    message : `Successfully Added ${addedMovie.title}`
 })
}
async function handleShowtimesPage(req,res){
    const movies = await movieModel.find({});
    res.render('addShowtimes' , {
        movies: movies
    });
}
async function  addShowTime(req,res){
    try {
          const {movie,date,time} = req.body;
    const addedShowtime =await showtimeModel.create({
         movie: movie,
            time: time,
            date: date
    });
    res.render('addShowTimes',{
        message : "Showtime Added Successfully"
    })
    }
    catch(err){
         res.render('addShowTimes',{
        message : "Something Unexpected Happened. Please Try Again"
    })
    }
  
}

async function updateMoviesPage(req,res){
    const movies = await movieModel.countDocuments({});
    const totalShowtimes = await showtimeModel.countDocuments({});
    const totalBookings = await bookingModel.countDocuments({});

    res.render('addMovie.hbs',{
        movieCount : movies,
        showtimeCount : totalShowtimes,
        bookingCount : totalBookings
    })
    
} 
module.exports = {addMovie,handleShowtimesPage,addShowTime, updateMoviesPage};