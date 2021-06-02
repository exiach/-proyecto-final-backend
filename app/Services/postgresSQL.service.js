const { Client } = require('pg');
const siteConfigurationService = require('./site-configuration.services');

const testConection = async (configuration) => {
  return executeQuery('select * from problemtable', configuration);
};

const getUserBocaAdmin = async (name, password) => {
  const query = 'select * from usertable where username = \''+name+'\' and usertype = \'admin\' and userpassword = \''+password+'\'' ;
  return executeQuery(query);
};

const getAllContest = async () => {
  const query = 'select * from contesttable order by contestnumber desc;';
  return executeQuery(query);
}

const getProblemsByContestNumber = async (contestNumber) => {
  const query = 'select * from problemtable where contestnumber ='+contestNumber+' order by problemnumber;';
  return executeQuery(query);
}

const getLanguagesByContestNumber = async (contestNumber) => {
  const query = 'select * from langtable where contestnumber ='+contestNumber+' order by contestnumber;';
  return executeQuery(query);
};

const getTeamsByProblem =  async (contestNumber, problemNumber, langNumber) => {
  const query = `
    select * from usertable
    where usernumber in
      (select  usernumber from runtable
          where contestnumber = ${contestNumber}
            and runproblem = ${problemNumber}
            and runlangnumber = ${langNumber}
            and not runstatus ~ 'deleted'
            and runanswer in (
              select answernumber
              from answertable 
              where contestnumber = ${contestNumber} and (runanswer = 'NO - Time limit exceeded' or runanswer = 'YES')
            )
      ) and contestnumber = ${contestNumber}
    order by usernumber
  `;
  return executeQuery(query);
};

const getTimesbyProblemAndLang =  async (contestNumber, problemNumber, langNumber) => {
  const query = `
    select * from runtable
    where contestnumber = ${contestNumber}
      and runproblem = ${problemNumber}
      and runlangnumber = ${langNumber}
      and not runstatus ~ 'deleted'
      and runanswer in (
        select answernumber
        from answertable
        where contestnumber = ${contestNumber} and (runanswer = 'NO - Time limit exceeded' or runanswer = 'YES')
        )
    order by usernumber
  `;
  return executeQuery(query);
};

const executeQuery = async (query, config=false) => {
  const result = config ? config : await siteConfigurationService.getSiteConfigurations();
  if (!result.error) {
    const { host, port, nameDB, userName, password } = result;
    const client = new Client({
      user: userName,
      host,
      database: nameDB,
      password,
      port
    });
    client.connect();
    try {
      const response = await client.query(query);
      client.end();
      return response.rows;
    } catch (e) {
      client.end();
      return { error: e };
    }
  }
  return result;
};

module.exports = {
  testConection: testConection,
  getUserBocaAdmin: getUserBocaAdmin,
  getAllContest: getAllContest,
  getProblemsByContestNumber: getProblemsByContestNumber,
  getLanguagesByContestNumber: getLanguagesByContestNumber,
  getTimesbyProblemAndLang: getTimesbyProblemAndLang,
  getTeamsByProblem: getTeamsByProblem
}
