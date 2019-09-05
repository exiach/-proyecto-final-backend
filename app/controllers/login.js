'use strict'
const authService = require('../Services').authService;
const postgresSqlService = require('../Services').postgresSqlService;

const signIn = async (req, res) => {
  // Update the logic.}
  const userMock = {
    name: 'admin',
    password: '7ab2d6e73d6ed4fb40fc1f97f051a183d01c3f469255b841a1cb529699310d28'
  };
  const user = await postgresSqlService.getUserBocaAdmin(userMock.name, userMock.password);
  return res.status(200).send({ token: authService.createToken(userMock) })
}

module.exports = {
  signIn
}