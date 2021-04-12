const express = require('express');
const app = express();
app.use(express.json());
const config = require('./conf');

//konfiguracja Redisa
const Redis = require("ioredis");

const dbConnDataRedis = {
  port: config.redisPort,
  host: config.redisHost,
};
const clientRedis = new Redis(dbConnDataRedis);

clientRedis.on('error', err => {
    throw err;
});
clientRedis.on('connect', () => {
    console.log(`Connected to Redis.`)
});

app.get('/', async (req, res) => {
    res.send("hello from docker")
})

app.listen(3000, () => {
    console.log('MY REST API running on port 3000!');
});