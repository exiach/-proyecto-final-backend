'use strict'
const postgresSqlService = require('../Services').postgresSqlService;

const problemsByContestId = async (req, res) => {
  try {
    const response = await postgresSqlService.getProblemsByContestNumber(req.params.id);
    if (response && response.length > 0)
      return res.status(200).send(response);
    else
      return res.status(403).send();
  
  } catch (e) {a
    console.error(e);
  }
}

module.exports = {
  problemsByContestId
};