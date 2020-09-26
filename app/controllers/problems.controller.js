'use strict'
const postgresSqlService = require('../Services').postgresSqlService;

const problemsByContestId = async (req, res) => {
  try {
    const response = await postgresSqlService.getProblemsByContestNumber(req.params.id);
    if (response && response.length > 0)
      return res.status(200).send(response);
    else
      return res.status(403).send();
  } catch (e) {
    console.error(e);
  }
}

const getTimesbyLang = async (req, res) => {
  try {
    let { contestNumber, problemNumber, langNumber } = req.params;
    if (typeof contestNumber === 'number' && typeof problemNumber === 'number' && typeof langNumber === 'number')
      return res.status(400).send({
        error: 'The params should be numbers.'
      });
    const teams = await postgresSqlService.getTeamsByProblem(contestNumber, problemNumber, langNumber);
    const timesByTeam = await postgresSqlService.getTimesbyProblemAndLang(contestNumber, problemNumber, langNumber);
    const response = [];
    teams.forEach(team => {
      response.push({
        id: team.usernumber,
        name: team.username,
        contestNumber: team.contestnumber,
        times: timesByTeam.filter(timeByteam => {
          return timeByteam.usernumber === team.usernumber
        })
      });
    });
    return res.status(200).send(response);
  } catch(e) {
    console.error(e);
  }
}

module.exports = {
  problemsByContestId,
  getTimesbyLang
};