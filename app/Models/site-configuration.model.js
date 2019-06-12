class SiteConfiguration {
  constructor(host, port, nameDB, userName, password) {
    this.host = host;
    this.port = port;
    this.nameDB = nameDB;
    this.userName = userName;
    this.password = password;
  }
}

module.exports = SiteConfiguration;