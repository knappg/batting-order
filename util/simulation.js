var playerData = require('../resources/player-data.json').players;

// Some globals
var battingPossibilities = {
  "OUT": 0,
  "SINGLE": 1,
  "DOUBLE": 2,
  "TRIPLE": 3,
  "HOME_RUN": 4
};

function Game(startingLineup) {
  this.lineup = startingLineup;
  this.currentLineupIndex = 0;
  this.inning = 1;

  // Returns the number of runs scored
  // in this game
  this.play = function() {
    var runs = 0;
    while (this.inning <= 9) {
      runs = runs + this._playInning();
      this.inning++;
    }
    return runs;
  };

  this._playInning = function() {
    var outs = 0;
    // We keep track of the bases as a cicular queue.
    // index 0 is 1st base, index 1 is 2nd base, etc...
    // false means no one is on that base
    var bases = [false, false, false];
    var runs = 0;
    while (outs !== 3) {
      var atBat = this._getBatterResult();
      if (atBat === battingPossibilities.OUT) {
        outs++;
      } else {
        runs = runs +  this._getRunsFromBases(bases, atBat);
      }
    }
    return runs;
  };

  this._getRunsFromBases = function(bases, atBat) {
    var runs = 0;
    // Take care of home runs and triples
    if (atBat === battingPossibilities.HOME_RUN || atBat === battingPossibilities.TRIPLE) {
      for (var i = 0; i < bases.length; i++) {
        if (bases[i]) {
          runs++;
          bases[i] = false;
        }
      }
      if (atBat === battingPossibilities.HOME_RUN) {
        return runs + 1;
      }
      if (atBat === battingPossibilities.TRIPLE) {
        bases[2] = true;
        return runs;
      }
    }

    // Double case
    if (atBat === battingPossibilities.DOUBLE) {
      // If someone on second or third, they each score
      if (bases[2]) {
        runs++;
        bases[2] = false;
      }
      if (bases[1]) {
        runs++;
        bases[1] = false;
      }
      // If someone on first - there's a chance they score, chance they go to third
      if (bases[0]) {
        var scoringChance = Math.random();
        bases[0] = false;
        if (scoringChance < 0.95) {
          runs++;
        } else {
          bases[2] = true;
        }
      }
      // Batter ends up on second
      bases[1] = true;
    }
    if (atBat === battingPossibilities.SINGLE) {
      // Someone on third - they score
      if (bases[2]) {
        runs++;
        bases[2] = false;
      }
      // Someone on second - there's a chance they score
      if (bases[1]) {
        bases[1] = false;
        var scoringChance = Math.random();
        if (scoringChance < 0.70) {
          runs++;
        } else {
          bases[2] = true;
        }
      }

      // Someone on first - 50/50 between second and third
      if (bases[0]) {
        bases[0] = false;
        var runningChance = Math.random();
        if (runningChance < 0.50) {
          bases[1] = true;
        } else {
          bases[2] = true;
        }
      }

      // Player ends up on first
      bases[0] = true;
    }
    return runs;
  };

  this._getBatterResult = function() {
    var player = playerData[this.lineup[this.currentLineupIndex]];
    this.currentLineupIndex++;
    if (this.currentLineupIndex === this.lineup.length) {
      this.currentLineupIndex = 0;
    }
    var atBats = player.atBats;
    var randomNum = Math.floor(Math.random() * atBats);
    if (randomNum < player.singles) {
      return battingPossibilities.SINGLE;
    } else if (randomNum < player.singles + player.doubles) {
      return battingPossibilities.DOUBLE;
    } else if (randomNum < player.singles + player.doubles + player.triples) {
      return battingPossibilities.TRIPLE;
    } else if (randomNum < player.singles + player.doubles + player.triples + player.homeRuns) {
      return battingPossibilities.HOME_RUN;
    } else {
      return battingPossibilities.OUT;
    }
  };
}

/**
 * Tools for simulations
 * @exports util/simulation
 */
var simulation = {

  /**
   * @param {Array.<number>} lineup
   * @returns {number} The average runs scored with this lineup after simulating
   *   the number of games defined in the global config.
   */
  simulateGames: function(lineup) {
    var totalRuns = 0;
    for (var i = 0; i < 1000; i++) {
      var game = new Game(lineup);
      totalRuns += game.play();
    }
    return totalRuns / 1000.0;
  }
}

module.exports = simulation;
