const SiteConfiguration = require('../Models').SiteConfiguration;

const saveConfiguration = (configuration) => {
  const { host, port, nameBD, userName, password } = configuration
  const siteConfiguration = new SiteConfiguration(host, port, nameBD, userName, password);
  
}

module.exports = {
  saveConfiguration: saveConfiguration
}


