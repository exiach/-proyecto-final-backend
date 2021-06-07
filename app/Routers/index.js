const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const siteConfiguration = controllers.siteConfiguration;
const middleware = require('../middlewares/auth.middleware');
const contests = controllers.contests;
const problems = controllers.problems;
const languages = controllers.languages;
const auth = controllers.auth;

router.get('/', (req, res) => {
  res.send('It is working');
});

router.post('/site/configuration', siteConfiguration.postSiteConfiguration);

router.get('/site/configuration', siteConfiguration.getSiteConfiguration);

router.get('/contests', [middleware.verifyToken], contests.contests);

router.get('/contest/:id/problems', [middleware.verifyToken], problems.problemsByContestId);

router.get('/contest/:contestNumber/languages',[middleware.verifyToken],  languages.getLanguagesByContestNumber);

router.get('/contest/:contestNumber/problem/:problemNumber/language/:langNumber', [middleware.verifyToken], problems.getTimesbyLang);

router.post('/signin', auth.signIn);

module.exports = router