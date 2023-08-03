const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.CON_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected')
    })
}

module.exports = connectDB
