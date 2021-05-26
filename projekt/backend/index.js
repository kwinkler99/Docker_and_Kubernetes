const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

var cors = require('cors')
const app = express();
const appId = uuidv4();

const appPort = 5000;

app.use(express.json());
app.use(cors())
require('dotenv').config();

//konfiguracja Mongo

const dbConnData = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE
};

const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

const Calculator = require('./models/Calculator');

// //konfiguracja Redisa
// const Redis = require("ioredis");

// const dbConnDataRedis = {
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_HOST,
// };
// const clientRedis = new Redis(dbConnDataRedis);

// clientRedis.on('error', err => {
//     throw err;
// });
// clientRedis.on('connect', () => {
//     console.log(`Connected to Redis.`)
// });


//ENDPOINTY
app.get('/mongo', async (req, res) => {

    Calculator.find(function (err, result) {
        if (err) return console.error(err);
        return res.send(result);
    })    
})

app.get('/redis', async (req, res) => {
    const allKeys = await client.keys("*", (err, result) => {
        if (err) return res.sendStatus(400)
        return result
      })
      return res.send({
        all: allKeys
      })  
})

app.post('/', async (req, res) => {
    try {

    } catch (error) {
    }
});

app.get('/api', (req, res) => {
    res.send(`${appId} - test project`)
})

app.listen(appPort, res => {
    console.log(`App listening on port  ${appPort}`)
});



