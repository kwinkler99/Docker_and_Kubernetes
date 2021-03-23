const express = require('express');
const app = express();
app.use(express.json());


//konfiguracja Postgresa
const config = require('./conf');

const dbConnDataPostgres = {
    host: config.postgresHost || '172.18.0.3',
    port: config.postgresPort || 5432,
    database: config.postgresDb || 'postgres',
    user: config.postgresUser || 'postgres',
    password: config.postgresPass 
};

const { Client } = require('pg')
const clientPostgres = new Client(dbConnDataPostgres)

clientPostgres
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
    })
    .catch(err => console.error('Connection error', err.stack));


//konfiguracja Redisa
const Redis = require("ioredis");

const dbConnDataRedis = {
  port: config.redisPort || 6379,
  host: config.redisHost || '172.18.0.2',
};
const clientRedis = new Redis(dbConnDataRedis);

clientRedis.on('error', err => {
    console.error('Error connecting to Redis', err);
});
clientRedis.on('connect', () => {
    console.log(`Connected to Redis.`)
});


//ENDPOINTY

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(5000, () => {
    console.log('MY REST API running on port 5000!');
});