const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();
const User = require(path.join(__dirname, '../mongoDb.js'));
const bookSeat = require(path.join(__dirname, '../booking.js'));

app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true }));

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '');
}

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/login', (req, res) => {
  res.render('login.hbs');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/main', (req,res)=>{
    res.render('main');
});
router.post('/signup', async (req, res) => {
    console.log('Received signup request:', req.body);
    const { email, password } = req.body;
    const existingUsers = await User.findOne({email: email});
    if (!existingUsers) {
    try{
        const newUser = User.create({ email, password });
        res.redirect('/main');
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
    } else {
        console.log('User already exists:', email);
        res.render('signup', { 
            error: 'User already exists. Please log in.',
            email: email // preserve the email for better UX
        });
    }
});

router.post('/login', async (req, res) => {
    const user = req.body;
    try {
        const foundUser = await User.findOne({email: user.email});
        if (foundUser && foundUser.password === user.password) {
            console.log('Login successful for user:', foundUser.email);
            res.redirect('/main');
        }
        else {
            // Render login page with error message
            res.render('login', { 
                error: 'Invalid email or password',
                email: user.email // preserve the email for better UX
            });
            console.log('Login failed for user:', user.email);
        }
    }
    catch (error) {
        console.error('Error during login:', error);    
        res.render('login', { 
            error: 'Error during login. Please try again.',
            email: user.email
        });
    }
});

router.get('/book', async (req,res)=>{
    const title = req.query.title;
    const movies = [
        {
            title: "The Galactic Odyssey",
            genre: "Sci-Fi, Adventure",
            imageUrl: "https://cdn.scribblehub.com/images/42/Galactic-Odyssey-StarKnights_846089_1692746155.jpg"
        },
        {
            title: "Mystery on the Moor",
            genre: "Mystery, Thriller",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/The_Moor_%28film%29.jpg/250px-The_Moor_%28film%29.jpg"
        },
        {
            title: "Romantic Getaway",
            genre: "Romance, Comedy",
            imageUrl: "https://m.media-amazon.com/images/M/MV5BMDRhOTA2ODQtMjkxOC00NDM3LWI2YWUtMDk3MWMzZTM4NjNlXkEyXkFqcGc@._V1_.jpg"
        },
        {
            title: "The Last Knight",
            genre: "Fantasy, Action",
            imageUrl: "https://dg3fwljcbubde.cloudfront.net/Posters/last-knights.jpg"
        },
        {
            title: "Haunted Whispers",
            genre: "Horror",
            imageUrl: "https://m.media-amazon.com/images/M/MV5BMTY4NGMxN2QtYTdiMC00MDAzLWIyZGItMjgzNTBkNjVlY2Q1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "The Grand Heist",
            genre: "Crime, Thriller",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9DMJ8aI1lCMOuXTM-SE68QBoRp-OTRRJ06w&s"
        }
    ];
    const slug = slugify(title);
    let occupiedSeats = await bookSeat.find({slug:slug});
    console.log("slug",{slug});
    console.log(occupiedSeats);
    let occupiedSeat = occupiedSeats.map(element => element.seatId);
    console.log(occupiedSeat);
    
    const movie = movies.find(movie => movie.title === title);
    res.render('book.hbs', {
        title : movie.title,
        img_url : movie.imageUrl,
        genre : movie.genre,
        occupiedSeats: JSON.stringify(occupiedSeat)
    });
});

router.post('/savebooking', async (req, res) => {
    const {seats , title} = req.body;
    const slug = slugify(title);
    try {
      const seatDocs = seats.map(seatId => ({
    title: title,
    seatId: seatId,
    slug : slug

}));
        const bookedSeat = await bookSeat.insertMany(seatDocs);

        console.log('Added seat:', bookedSeat);

        // Send a response
        res.send(`Seat booked for ${title}`);
    } catch (error) {
        console.error('Error booking seat:', error);
        res.status(500).send('Error booking seat');
    }
});


module.exports = router;