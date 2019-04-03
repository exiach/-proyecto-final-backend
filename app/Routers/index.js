const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const siteConfiguration = controllers.siteConfiguration;

router.get('/', function(req, res) {
  res.send('It is working');
});

router.post('/site/configuration', siteConfiguration.postSiteConfiguration);
module.exports = router