const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

const router = express.Router();

// Get All News that is not archived
router.get("/news", (req, res) => {
    db.query("SELECT id, title, description, thumbnail FROM news WHERE isDeleted = 0", (err, results) => {
        if (err) return res.status(500).json(err);

        // Add localhost:5000 to the image path
        const formattedResults = results.map(news => ({
            id: news.id,
            title: news.title,
            description: news.description,
            thumbnail: `http://localhost:5000${news.thumbnail}`
        }));

        res.json(formattedResults);
    });
});

// Get All Artwork that is not archived
router.get("/artworks", (req, res) => {
    db.query("SELECT id, student_name, artwork FROM artworks WHERE isDeleted = 0", (err, results) => {
        if (err) return res.status(500).json(err);

        // Format the results to include full image URL
        const formattedResults = results.map(artwork => ({
            id: artwork.id, 
            student_name: artwork.student_name,  
            artwork: `http://localhost:5000${artwork.artwork}`
        }));

        res.json(formattedResults);
    });
});



module.exports = router;
