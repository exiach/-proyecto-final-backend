const SiteConfiguration = require('../Models').SiteConfiguration;

const saveConfiguration = (configuration, res) => {
  const { host, port, nameBD, userName, password } = configuration;

  const siteConfiguration = new SiteConfiguration({ 
    host: host,
    port: port,
    nameBD: nameBD,
    userName: userName,
    password: password
  });
  siteConfiguration.save(function (err) {
    if (err) return handleError(err);
    // saved!
    res.status = 200;
    res.send('Configuration saved');
  });
}

module.exports = {
  saveConfiguration: saveConfiguration
}


