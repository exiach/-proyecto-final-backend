'use strict'
const authService = require('../Services').authService;
const postgresSqlService = require('../Services').postgresSqlService;

const signIn = async (req, res) => {
  try {
    const body = req.body;
    const { userName, password } = body;
    const response = await postgresSqlService.getUserBocaAdmin(userName, password);
    if (response && response.length > 0)
      return res.status(200).send({ 
        token: authService.createToken(response[0]),
        userName: response[0].username
      });
    else
      return res.status(403).send();
  
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  signIn
}