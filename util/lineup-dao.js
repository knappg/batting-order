var config = require('../resources/config.json');

console.log('hi');
var knex = require('knex')(config.databaseConfig);

var dao = {
  saveLineup: function(lineupData, averageRuns) {
    return new Promise(function(resolve, reject) {
      knex.transaction(function(trx) {
        knex
          .insert({lineup_data: lineupData, average_runs: averageRuns})
          .into('lineups')
          .then(trx.commit)
          .catch(trx.rollback);
      }).then(resolve).catch(reject);
    });
  }
};

module.exports = dao;
