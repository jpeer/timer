var moves = [ "U", "L", "F", "R", "B", "D", "U'", "L'", "F'", "R'", "B'", "D'"  ];

var createScramble = function () {

  var result = [];
  for(var i = 0; i < 20; i++) {
    var idx = Math.floor(Math.random() * moves.length);
    result.push(moves[idx]);
  }

  return result;
}

module.exports = {createScramble: createScramble};
