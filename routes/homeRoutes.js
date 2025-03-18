const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

const router = express.Router();

// Get All News that is not archived
router.get("/", (req, res) => {
    db.query("SELECT id, title, thumbnail FROM news WHERE isDeleted = 0", (err, results) => {
        if (err) return res.status(500).json(err);

        // Add localhost:5000 to the image path
        const formattedResults = results.map(news => ({
            id: news.id,
            title: news.title,
            thumbnail: `http://localhost:5000${news.thumbnail}`
        }));

        res.json(formattedResults);
    });
});


module.exports = router;
