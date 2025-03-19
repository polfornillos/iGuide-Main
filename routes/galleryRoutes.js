const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

const router = express.Router();

// Get All Artwork that is not archived
router.get("/artworks", (req, res) => {
    db.query(
        "SELECT id, title, student_name, artwork, facebook_link, instagram_link, twitter_link FROM artworks WHERE isDeleted = 0",
        (err, results) => {
            if (err) return res.status(500).json(err);

            // Format the results to include full image URL
            const formattedResults = results.map(artwork => ({
                id: artwork.id,
                student_name: artwork.student_name,
                title: artwork.title,
                artwork: `http://localhost:5000${artwork.artwork}`,
                facebook_link: artwork.facebook_link || "#", 
                instagram_link: artwork.instagram_link || "#",
                twitter_link: artwork.twitter_link || "#"
            }));

            res.json(formattedResults);
        }
    );
});



module.exports = router;
