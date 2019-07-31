'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
// TODO update config
// const config = require('../config.js').SECRETE_TOKEN;

function createToken (user) {
  const payload = {
    sub: user.name,// TODO changes for somthing better.
    iat: moment().unix,
    exp: moment().add(2, 'hours').unix()
  };
  
  return jwt.encode(payload, 'CLveejenplotojkn');
}

module.exports = {
  createToken
};
