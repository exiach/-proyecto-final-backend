const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const siteConfiguration = controllers.siteConfiguration;
const login = controllers.login;

router.get('/', (req, res) => {
  res.send('It is working');
});

router.post('/site/configuration', siteConfiguration.postSiteConfiguration);

router.get('/site/configuration', siteConfiguration.getSiteConfiguration);

router.get('/login', login.signIn);

module.exports = router