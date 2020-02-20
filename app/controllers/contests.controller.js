'use strict'
const postgresSqlService = require('../Services').postgresSqlService;

const contests = async (req, res) => {
  try {
    const response = await postgresSqlService.getAllContest();
    if (response && response.length > 0)
      return res.status(200).send(response);
    else
      return res.status(403).send();
  
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  contests
};