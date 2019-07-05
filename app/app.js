const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.use('', routes);

app.listen(port, () =>
  console.log('Project is already up!.')
);
