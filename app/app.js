const express = require('express');
const app = express();
const port = 3000;
const routes = require('./Routers');

app.use('', routes);
app.listen(port, () => {
  console.log('Project is already up!.');
});

module.exports = {
  app
};