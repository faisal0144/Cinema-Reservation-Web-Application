const express = require('express');
const path = require('path');
const showtime = require('../models/showtimes');
const app = express();
const port = 3000;
const router = express.Router();


const {handleBooking,UpdateBookingPage} = require(path.join(__dirname, '../controller/booking.js'));
const handleMovies = require(path.join(__dirname, '../controller/movies.js'));
const  handleAuth= require(path.join(__dirname, '../controller/auth.js'));
const handleShowtimes = require(path.join(__dirname, '../controller/showtimes.js'));
const {handleSignup,handleSignin,HandleAdminSignup } = require(path.join((__dirname, '../controller/user.js')))
const {addMovie,handleShowtimesPage,addShowTime, updateMoviesPage} = require(path.join(__dirname, '../controller/admin.js'));


app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true }));



router.get('/', (req, res) => {
  res.redirect('/auth');
});
router.get('/auth', (req,res)=>{
    handleAuth(req,res);
})

router.get("/showtimes", (req,res)=>{
    handleShowtimes(req,res);
})
router.get('/login', (req, res) => {
  res.render('login.hbs');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/admin-signup', (req,res)=>{
    res.render('adminSignup');
})
router.post('/admin-signup', (req,res)=>{
    HandleAdminSignup(req,res);
})
router.get('/main', (req,res)=>{
    handleMovies(req,res);
});
router.post('/signup', (req,res)=>{
    handleSignup(req,res);
});

router.post('/login', async (req, res) => {
    handleSignin(req,res);
});

router.get('/book', async (req,res)=>{
    UpdateBookingPage(req,res);
});

router.post('/savebooking', async (req, res) => {
    await handleBooking(req,res);
    
});

router.get('/admin/addmovie', (req,res) =>{
    updateMoviesPage(req,res);
} )
router.get('/admin', (req,res) =>{
    res.redirect('/admin/addmovie');
} )

router.post('/admin/addmovie', (req,res) =>{
    addMovie(req,res);
} )

router.get('/admin/addshowTime', (req,res) =>{
    handleShowtimesPage(req,res);
    
} )

router.post('/admin/addshowTime', (req,res) =>{
   addShowTime(req,res);
} )



module.exports = router;