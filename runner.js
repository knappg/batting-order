var playerData = require('./resources/player-data.json');
var simulation = require('./util/simulation');

console.time('test');
var runs = 0;
for (var i = 0; i < 1000; i++) {
  runs += simulation.simulateGames(playerData.players);
}
console.timeEnd('test');
console.log(runs);
