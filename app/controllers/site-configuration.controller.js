const siteConfigurationService = require('../Services').siteConfigurationServices;
const postgresSqlService = require('../Services').postgresSqlService;
const SiteConfiguration = require('../Models').SiteConfiguration;

const postSiteConfiguration = (req, res) => {
  postgresSqlService.testConection(req.body)
  .then(result => {
    if (result.error) {
      res.status(400);
      res.send(result.error.message);
      console.log(result)
    } else {
      try {
        siteConfigurationService.saveConfiguration(req.body, res);
      } catch (error) {
        console.error(error);  
        res.status(400);
        res.send(error);    
      }
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