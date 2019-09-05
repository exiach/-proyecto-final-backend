// class SiteConfiguration {
//   constructor(host, port, nameDB, userName, password) {
//     this.host = host;
//     this.port = port;
//     this.nameDB = nameDB;
//     this.userName = userName;
//     this.password = password;
//   }
// }

// module.exports = SiteConfiguration;

const  mongoose = require('mongoose');
const siteConfigurationSchema = new mongoose.Schema({
  host: {
    type: String
  },
  port: {
    type: Number
  },
  nameDB: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('SiteConfiguration', siteConfigurationSchema);
