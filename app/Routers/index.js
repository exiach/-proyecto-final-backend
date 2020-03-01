const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const siteConfiguration = controllers.siteConfiguration;
const login = controllers.login;
const auth = require('../middlewares/auth.middleware');
const contests = controllers.contests;
const problems = controllers.problems;
router.get('/', (req, res) => {
  res.send('It is working');
});

router.post('/site/configuration', siteConfiguration.postSiteConfiguration);

router.get('/site/configuration', siteConfiguration.getSiteConfiguration);

router.post('/login', login.signIn);

router.get('/contests', contests.contests);

router.get('/contest/:id/problems', problems.problemsByContestId);

// TODO only for testing remove after define new api's with private access.
router.get('/private', auth.isAuth, function(req, res) {
  res.status(200).send({message: 'have access to endpoints.'});
});

module.exports = router