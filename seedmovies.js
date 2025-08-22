const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/cinemaDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting:", err));

// Showtime model
const Showtime = require("./models/showtimes");

async function seedShowtimes() {
  try {
    const movieId = "68a5ea1814a090701615f6f6"; // your movie _id

    const showtimes = [
      { movie: movieId, time: "6:00 PM", date: "2025-08-20" },
      { movie: movieId, time: "9:00 PM", date: "2025-08-20" },
      { movie: movieId, time: "3:00 PM", date: "2025-08-21" },
      { movie: movieId, time: "8:00 PM", date: "2025-08-21" }
    ];

    await Showtime.insertMany(showtimes);
    console.log("Showtimes seeded successfully!");
  } catch (err) {
    console.error("Error seeding showtimes:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedShowtimes();