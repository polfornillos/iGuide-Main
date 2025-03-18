const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Import routes
const homeRoutes = require('./routes/homeRoutes');

// Use routes
app.use('/home', homeRoutes);

app.listen(5001, () => {
    console.log('Server running on port 5001');
});