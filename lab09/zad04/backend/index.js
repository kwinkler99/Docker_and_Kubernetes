const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
var cors = require('cors')
const appId = uuidv4();
const appPort = 5000;
app.use(express.json());
app.use(cors())

app.get('/api', (req, res) => {
    res.send(`[${appId}] hello from my backend server`)
})

app.listen(appPort, res => {
    console.log(`App listening on port  ${appPort}`)
});
