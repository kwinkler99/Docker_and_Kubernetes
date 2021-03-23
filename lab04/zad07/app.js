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
        clientPostgres.query('CREATE TABLE IF NOT EXISTS NWD(numA int, numB int, result int)');
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


//FUNKCJA NWD
function nwd(a, b){
    let tmp;
    while( b != 0 ){
        tmp = a;
        a = b;
        b = tmp % b;
    }
    return a;
}

//ENDPOINTY
app.get('/', async (req, res) => {
    const { numA, numB } = req.body;
    const value = nwd(parseInt(numA), parseInt(numB));

    const resultPostgres = (await clientPostgres.query(
        'INSERT INTO NWD (numA, numB, result) VALUES($1, $2, $3) RETURNING *', [numA, numB, value]));

    const resultRedis = (await clientRedis.set((numA, numB), value));

    res.send({'resultPostgres': resultPostgres.rows, 'resultRedis': resultRedis});
});





app.listen(5000, () => {
    console.log('MY REST API running on port 5000!');
});