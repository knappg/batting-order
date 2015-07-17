var playerData = require('./resources/player-data.json');
var simulation = require('./util/simulation');
var dao = require('./util/lineup-dao');
var dao2 = require('./util/lineup-dao');

console.time('test');
var runs = 0;
for (var i = 0; i < 1; i++) {
  runs += simulation.simulateGames(playerData.players);
}
console.timeEnd('test');
console.log(runs);

var averageRuns = [2.1, 3.1];
var lineupData = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var promises = [];
averageRuns.forEach(function(averageRun) {
  promises.push(dao.saveLineup(lineupData, averageRun));
});

Promise.all(promises).then(function(){
  process.exit();
});
