const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const cors = require('cors'); 

const routes = require('./Routers');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to Boca DB!');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// Configurar cabeceras y cors
app.use(cors());


app.use('', routes);

app.listen(port, () =>
  console.log('Project is already up!.')
);
