var simulation = require('./util/simulation');
var util = require('./util/util');
var dao = require('./util/lineup-dao');

var totalSims = 0;
var gen = util.combinationGenerator(9);

var processNextLineup = function() {
  var nextLineupData = gen.next();
  if (nextLineupData.done) {
    process.exit();
  }
  totalSims++;
  if (totalSims % 1000 === 0) {
    console.log('Processed batch ' + (totalSims / 1000) + ' thousand');
  }
  var runs = simulation.simulateGames(nextLineupData.value);
  dao.saveLineup(nextLineupData.value, runs).then(processNextLineup);
};

processNextLineup();
