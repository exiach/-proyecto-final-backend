const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('../config');
const postgresSqlService = require('../Services').postgresSqlService;

const signIn = async (req, res) => {
  try {
    const body = req.body;
    const { userName, password } = body;
    const response = await postgresSqlService.getUserBocaAdmin(userName, password);
    if (response && response.length > 0) {
      const token = jwt.sign({ id: response[0].username }, config.SECRET, {
        expiresIn: moment().add(2, 'hours').unix()
      });
      return res.status(200).send({ 
        token: token,
        userName: response[0].username
      });
    } else {
      return res.status(403).send();
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send('Error to conect to DB.')
  }
}

module.exports = {
  signIn
}