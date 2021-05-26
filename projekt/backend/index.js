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

//konfiguracja Redisa
const Redis = require("ioredis");

const dbConnDataRedis = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};
const clientRedis = new Redis(dbConnDataRedis);

clientRedis.on('error', err => {
    throw err;
});
clientRedis.on('connect', () => {
    console.log(`Connected to Redis.`)
});


//ENDPOINTY
// app.get('/mongo', async (req, res) => {

//     Calculator.find(function (err, result) {
//         if (err) return console.error(err);
//         return res.send(result);
//     })    
// })

// app.get('/redis', async (req, res) => {
//     const allKeys = await clientRedis.keys("*", (err, result) => {
//         if (err) return res.sendStatus(400)
//         return result
//       })
//       return res.send({
//         all: allKeys
//       })  
// })


//GET
app.get('/sum', async (req, res) => {
  const history = await Calculator.aggregate()
    .match({
      operation: {$eq: 'sum'}
    })

  res.send(history)
})

app.get('/substraction', async (req, res) => {
  const history = await Calculator.aggregate()
    .match({
      operation: {$eq: 'substraction'}
    })

  res.send(history)
})

app.get('/multiply', async (req, res) => {
  const history = await Calculator.aggregate()
    .match({
      operation: {$eq: 'multiply'}
    })

  res.send(history)
})

app.get('/division', async (req, res) => {
  const history = await Calculator.aggregate()
    .match({
      operation: {$eq: 'division'}
    })

  res.send(history)
})


//POST
app.post('/', async (req, res) => {
  const new_operation = new Calculator({
    ...req.body
  })

  const inserted_operation= await new_operation.save();

  return res.send(inserted_operation);
});

//DELETE
app.delete('/', async (req, res) => {
  const id = req
  console.log(id)
  // const result = await Calculator.findByIdAndDelete(id)
  // res.send(result)
})



//LISTEN
app.listen(appPort, res => {
    console.log(`App listening on port  ${appPort}`)
});



