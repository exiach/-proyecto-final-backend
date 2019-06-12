const siteConfigurationService = require('../Services').siteConfigurationServices;
const postgresSqlService = require('../Services').postgresSqlService

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


module.exports = {
  postSiteConfiguration: postSiteConfiguration
};