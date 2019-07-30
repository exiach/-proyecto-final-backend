'use strict'
const service = require('../Services/auth.service');

function signIn (req, res) {
  // Update the logic.
  const userMock = {
    name: 'daniel'
  };
  return res.status(200).send({ token: service.createToken(userMock) })
}

module.exports = {
  signIn
}