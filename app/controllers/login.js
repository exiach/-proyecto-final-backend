'use strict'
const authService = require('../Services').authService;

function signIn (req, res) {
  // Update the logic.
  const userMock = {
    name: 'daniel'
  };
  return res.status(200).send({ token: authService.createToken(userMock) })
}

module.exports = {
  signIn
}