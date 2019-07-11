const cool = require('cool-ascii-faces');
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const userRouter = require('./routes/userRotes');

mongoose.connect('mongodb://heroku_0m79lj8f:j0dhm333htcg6qru5822inhe3j@ds141294.mlab.com:41294/heroku_0m79lj8f', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database - ' + err)
});

express()
  .use(cors())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())  
  .get('/', (req, res) => {
    res.send(cool());    
  })
  .use('/user', userRouter)  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
