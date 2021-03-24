const express = require('express');
const app = express();
app.use(express.json());


//konfiguracja Postgresa
const config = require('./conf');

const dbConnDataPostgres = {
    host: config.postgresHost,
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
        clientPostgres.query('CREATE TABLE IF NOT EXISTS nwd(numA int, numB int, result int)');
        console.log('Connected to PostgreSQL');
    })
    .catch(err => {throw err});


//konfiguracja Redisa
const Redis = require("ioredis");

const dbConnDataRedis = {
  port: config.redisPort || 6379,
  host: config.redisHost,
};
const clientRedis = new Redis(dbConnDataRedis);

clientRedis.on('error', err => {
    throw err;
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
    try {
        const result = (await clientPostgres.query(
            'SELECT * FROM nwd'
        ))
        res.send({'result': result.rows});
    } catch (error) {
        throw error
    }
})

app.post('/', async (req, res) => {
    try {
        const { numA, numB } = req.body;
    const value = nwd(parseInt(numA), parseInt(numB));

    //sprawdzenie czy dany klucz wystepuje w Redis
    let tmp;
    (await clientRedis.get((numA, numB), (err, result) => {
        if (err) return res.sendStatus(400)
        if(result){
            tmp = result;
        }
    }))

    //jesli nie wystepuje w redis to zapisuje do obu baz danych
    if(!tmp){
        //zapis do postgresql
        tmp = (await clientPostgres.query(
            'INSERT INTO nwd (numA, numB, result) VALUES($1, $2, $3) RETURNING result', [numA, numB, value])).rows;

        //zapis do redisa
        (await clientRedis.set((numA, numB), value));
    }

    res.send({'result': tmp});
    } catch (error) {
        throw error
    }
});


app.listen(5000, () => {
    console.log('MY REST API running on port 5000!');
});