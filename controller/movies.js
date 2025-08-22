const express = require("express");
const path = require("path");
const movies = require(path.join(__dirname,"../models/movies.js"));

async function fecthMovies(req,res){
    try{
        const foundmovies = await movies.find();
        
        res.render("main.hbs", {"movies":foundmovies} )
    }
    catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movies");
  }
    
}

module.exports = fecthMovies;