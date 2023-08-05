const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')

//Create Express App
const app = express()

//Connect DataBase
connectDB();

//Body Parser for JSON to use in req.body
app.use(express.json())

//Import routes
const userRoutes = require('./routes/userRoutes.js');
const blogPostRoutes = require('./routes/blogPostRoutes.js');

//Mount Routes
app.use('/api', userRoutes) 
app.use('/api', blogPostRoutes)


//Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})