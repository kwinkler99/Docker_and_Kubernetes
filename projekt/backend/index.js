const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

var cors = require('cors')
const app = express();

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


////ENDPOINTY MONGO

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

  await new_operation.save();

  const response = await Calculator.find();

  return res.send(response);
});

//DELETE
app.delete('/:id', async (req, res) => {
  const id = req.params.id
  const result = await Calculator.findByIdAndDelete(id)
  res.send(result)
})


////ENDPOINTY REDIS

app.get('/form/:key', async (req, res) => {
  const key = req.params.key
  const find = JSON.parse(await clientRedis.get(key));

  if(find){
    res.send({
      correct: true,
      find: find
    })
  } else {
    res.send({
      correct: false,
      warning: "Nie ma takiego użytkownika",
    })
  }


})

app.post('/form', async (req, res) => {
  const new_form = req.body
  const key = req.body.name + req.body.surname
  const check = await clientRedis.get(key);
  
  if(check){
    res.send({
      correct: false,
      warning: "Taki użytkownik już wypełnił ankietę"
    })
  } else {
    await clientRedis.set(key, JSON.stringify(new_form))

    res.send({
      correct: true,
    })
  }
})

app.put('/form', async (req, res) => {
  const new_form = req.body
  const key = req.body.name + req.body.surname

  await clientRedis.set(key, JSON.stringify(new_form))

  res.send({correct: true})
})

app.delete('/form/:key', async (req, res) => {
  const key = req.params.key

  await clientRedis.del(key)

  res.send({correct: true})
})





//LISTEN
app.listen(appPort, res => {
    console.log(`App listening on port  ${appPort}`)
});



