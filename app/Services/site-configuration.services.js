const SiteConfiguration = require('../Models').SiteConfiguration;

const saveConfiguration = (configuration, res) => {
  const { host, port, nameDB, userName, password } = configuration;

  const siteConfiguration = new SiteConfiguration({ 
    host: host,
    port: port,
    nameDB: nameDB,
    userName: userName,
    password: password
  });
  siteConfiguration.save(function (err) {
    if (err) return handleError(err);
    // saved!
    res.status = 200;
    res.send();
  });
}

const getSiteConfigurations = async () => {
  try {
    const result = await SiteConfiguration.find().exec();
    return result.pop();
  } catch (e) {
    return { error: e };
  }
}

module.exports = {
  saveConfiguration: saveConfiguration,
  getSiteConfigurations: getSiteConfigurations
}


