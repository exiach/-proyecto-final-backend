const siteConfigurationService = require('../Services').siteConfigurationServices;
const postgresSqlService = require('../Services').postgresSqlService;
const SiteConfiguration = require('../Models').SiteConfiguration;

const postSiteConfiguration = (req, res) => {
  postgresSqlService.testConection(req.body)
  .then(response => { 
    if (response) {
      try {
        siteConfigurationService.saveConfiguration(req.body, res);
      } catch (error) {
        console.error(error);  
        res.status(400);
        res.send(error);    
      }
    } else {
      res.status(400);
      res.send('None shall pass');
    } 
  });
};

const getSiteConfiguration = async (req, res) => {
  try {
    var result = await SiteConfiguration.find().exec();
    if (result.length > 0)
      res.send({
        enableSettingsDB: true
      });
    else
      res.send({
        enableSettingsDB: false
      });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  postSiteConfiguration: postSiteConfiguration,
  getSiteConfiguration: getSiteConfiguration
};