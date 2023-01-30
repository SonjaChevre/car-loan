const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

const config = {
    name: 'sample-express-app',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));


app.get('/', (req, res) => {
    res.json({"message": "Server is running"});
});

app.post('/calculateloan', (req, res) => {
    
    /*

      "carprice": 50000, 
      "downpayment": 0,   
      "lengthofloan": 18, 
      "rate": 0.06

    */

    var data = req.body;

    if (data.carprice > 1000 && data.carprice < 50000) {
        res.status(200).send(req.body);
    }

    else if (data.carprice <= 1000) {
        res.status(400).send("error: we only offer loan for car that cost more than 1000.");
    }

    // there is a timeout in case the car price is more than 50k
});

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});