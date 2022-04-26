require('dotenv').config()
require('./db')
const express = require('express')
const app = express()

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "WeFox API",
            description: "API Documentation",
            contact: {
                name: "Agustin Claret Vormitag"
            },
            servers: ["http://localhost:5000"]
        }
    },
    // ['.routes/*.js']
    apis: ["app.js", './routes/*.js', './models/*.js']
};

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerUi = require('swagger-ui-express');

const bodyParser = require('body-parser')


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())

require('./routes/login')(app);
require('./routes/api')(app);

const User = require("./models/User");

app.get('/createUser', async (req, res) => {
    const newUser = new User({email:'agustinclaret@hotmail.com', password:'testwefox'})
    newUser.password = await newUser.encryptPassword('testwefox')
    await newUser.save()
    res.status(200)
})

app.all('*', (req, res) => {
    console.log('No se pudo acceder a ruta')
    return res
        .status(404)
        .json({success: 'failed', msg:'No existe la ruta'})
})

module.exports = app