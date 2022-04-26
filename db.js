const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database connected to', process.env.DB_URI))
    .catch(err => console.log(err))
