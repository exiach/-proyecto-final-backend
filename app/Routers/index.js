const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const siteConfiguration = controllers.siteConfiguration;

router.get('/', (req, res) => {
  res.send('It is working');
});

router.post('/site/configuration', siteConfiguration.postSiteConfiguration);

router.get('/site/configuration', siteConfiguration.getSiteConfiguration);

module.exports = router