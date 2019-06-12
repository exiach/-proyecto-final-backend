const siteConfigurationService = require('../Services').siteConfigurationServices;
const postgresSqlService = require('../Services').postgresSqlService

const postSiteConfiguration = (req, res) => {
  postgresSqlService.testConection(req.body)
  .then(response => { 
    if (response) {
      try {
        siteConfigurationService.saveConfiguration(req.body);
      } catch (error) {
        console.error(error);        
      }
    } else {
      res.status(400);
      res.send('None shall pass');
    } 
  });
};


module.exports = {
  postSiteConfiguration: postSiteConfiguration
};