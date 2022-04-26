const app = require('./app')
//require('./db')

app.listen(process.env.PORT,() => {
    console.log('Server running on port: ' + process.env.PORT)
})
