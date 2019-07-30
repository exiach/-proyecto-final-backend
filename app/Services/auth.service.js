'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken (user) {
  const payload = {
    sub: user.name,// TODO changes for somthing better.
    iat: moment().unix,
    exp: moment().add(2, 'days').unix()
  };
  
  return jwt.encode(payload, config.SECRETE_TOKEN);
}

module.exports = createToken;
