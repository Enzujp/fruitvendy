const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const fruitRoutes = require("./api/routes/fruitRoutes");

const app = express();
const bodyParser = require("body-parser");

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json({ "limit": "10mb" }));
app.use(morgan('dev'));


// Request handling routes
app.use('/fruits', fruitRoutes); 


// database connection
const dbURI = "mongodb+srv://fruity:colliding@cluster0.9nnsrkb.mongodb.net/"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send("Hi baby, this works!")
});



app.listen(8000, ()=> {
    console.log("Fruity's online baby!");
})

