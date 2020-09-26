const { Pool, Client } = require('pg');
const siteConfigurationService = require('./site-configuration.services');

const testConection = (configuration) => {
  const { host, port, nameDB, userName, password } = configuration
  const connectionString = 'postgresql://'+userName+':'+password+'@'+host+':'+port+'/'+nameDB;  
  const pool = new Pool({
    connectionString: connectionString,
  });

  return pool.query('select * from problemtable')
    .then(response => {
      console.log(response.rows);
      pool.end();
      return {};
    })
    .catch(error => {
      console.error(error);
      pool.end();
      return { error: error };
    });
}

const getUserBocaAdmin = async (name, password) => {
  const result = await siteConfigurationService.getSiteConfigurations();
  if (result.length > 0) {
    const config = result.pop();
    const connectionString = 'postgresql://'+ config.userName +':'+ config.password  +'@'+ config.host+':'+config.port+'/'+config.nameDB;
    const pool = new Pool({
      connectionString: connectionString,
    });

    const query = 'select * from usertable where username = \''+name+'\' and usertype = \'admin\' and userpassword = \''+password+'\'' ;
    try {
      const response = await pool.query(query);
      pool.end();
      return response.rows;
    } catch (e) {
      pool.end();
      return { error: e };
    }
  }
}

const getAllContest = async () => {
  const result = await siteConfigurationService.getSiteConfigurations();
  if (result.length > 0) {
    const config = result.pop();
    const connectionString = 'postgresql://'+ config.userName +':'+ config.password  +'@'+ config.host+':'+config.port+'/'+config.nameDB;
    const pool = new Pool({
      connectionString: connectionString,
    });

    const query = 'select * from contesttable;';
    try {
      const response = await pool.query(query);
      pool.end();
      return response.rows;
    } catch (e) {
      pool.end();
      return { error: e };
    }
  }
}

const getProblemsByContestNumber = async (contestNumber) => {
  const result = await siteConfigurationService.getSiteConfigurations();
  if (result.length > 0) {
    const config = result.pop();
    const connectionString = 'postgresql://'+ config.userName +':'+ config.password  +'@'+ config.host+':'+config.port+'/'+config.nameDB;
    const pool = new Pool({
      connectionString: connectionString,
    });

    const query = 'select * from problemtable where contestnumber ='+contestNumber+' order by problemnumber;';
    try {
      const response = await pool.query(query);
      pool.end();
      return response.rows;
    } catch (e) {
      pool.end();
      return { error: e };
    }
  }
}

const getLanguagesByContestNumber = async (contestNumber) => {
  const result = await siteConfigurationService.getSiteConfigurations();
  if (result.length > 0) {
    const config = result.pop();
    const connectionString = 'postgresql://'+ config.userName +':'+ config.password  +'@'+ config.host+':'+config.port+'/'+config.nameDB;
    const pool = new Pool({
      connectionString: connectionString,
    });

    const query = 'select * from langtable where contestnumber ='+contestNumber+' order by contestnumber;';
    try {
      const response = await pool.query(query);
      pool.end();
      return response.rows;
    } catch (e) {
      pool.end();
      return { error: e };
    }
  }
};

const getTeamsByProblem =  async (contestNumber, problemNumber, langNumber) => {
  const result = await siteConfigurationService.getSiteConfigurations();
  if (result.length > 0) {
    const config = result.pop();
    const connectionString = `postgresql://${config.userName}:${config.password}@${config.host}:${config.port}/${config.nameDB}`;
    const pool = new Pool({
      connectionString: connectionString,
    });

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
    try {
      const response = await pool.query(query);
      pool.end();
      return response.rows;
    } catch (e) {
      pool.end();
      return { error: e };
    }
  }
};
const getTimesbyProblemAndLang =  async (contestNumber, problemNumber, langNumber) => {
  const result = await siteConfigurationService.getSiteConfigurations();
  if (result.length > 0) {
    const config = result.pop();
    const connectionString = `postgresql://${config.userName}:${config.password}@${config.host}:${config.port}/${config.nameDB}`;
    const pool = new Pool({
      connectionString: connectionString,
    });

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
    try {
      const response = await pool.query(query);
      pool.end();
      return response.rows;
    } catch (e) {
      pool.end();
      return { error: e };
    }
  }
}

module.exports = {
  testConection: testConection,
  getUserBocaAdmin: getUserBocaAdmin,
  getAllContest: getAllContest,
  getProblemsByContestNumber: getProblemsByContestNumber,
  getLanguagesByContestNumber: getLanguagesByContestNumber,
  getTimesbyProblemAndLang: getTimesbyProblemAndLang,
  getTeamsByProblem: getTeamsByProblem
}
