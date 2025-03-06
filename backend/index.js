const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./config');
const user = require('./routes/user');
const reservation = require('./routes/reservation');
const cookieParser = require('cookie-parser');
dotenv.config();
require('./cronTache.js');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

// Routes
app.use('/user', user);

app.use('/reservation', reservation);

// Connect to MongoDB

database.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(err);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
