const express = require("express");
const path = require("path");
const showtime = require(path.join(__dirname,"../models/showtimes.js"));

async function fetchShowtimes(req,res){
    try{
        const movieId = req.query.movieId;
        const foundShowtimes = await showtime.find({movie : movieId}).populate("movie");
        res.render("showtime", {
            "showtimes" : foundShowtimes
        });
        
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = fetchShowtimes;