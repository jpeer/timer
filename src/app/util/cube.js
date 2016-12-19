var _ = require('lodash');
var Cubicle = require('./cubicle').Cubicle;

const Sides = ['F', 'R', 'B', 'L', 'U', 'D'];

function Cube() {
  this.cubicles = [
    // top layer
    [
      [
        new Cubicle({U: 'w', B: 'b', L: 'o'}),
        new Cubicle({U: 'w', B: 'b'}),
        new Cubicle({U: 'w', B: 'b', R: 'r'}),
      ],
      [
        new Cubicle({U: 'w', L: 'o'}),
        new Cubicle({U: 'w'}),
        new Cubicle({U: 'w', R: 'r'}),
      ],
      [
        new Cubicle({U: 'w', F: 'g', L: 'o'}),
        new Cubicle({U: 'w', F: 'g'}),
        new Cubicle({U: 'w', F: 'g', R: 'r'}),
      ]
    ],
    // mid layer
    [
      [
        new Cubicle({B: 'b', L: 'o'}),
        new Cubicle({B: 'b'}),
        new Cubicle({B: 'b', R: 'r'})
      ],
      [
        new Cubicle({L: 'o'}),
        new Cubicle({}),
        new Cubicle({R: 'r'})
      ],
      [
        new Cubicle({F: 'g', L: 'o'}),
        new Cubicle({F: 'g'}),
        new Cubicle({F: 'g', R: 'r'})
      ]
    ],
    // lowest layer
    [
      [
        new Cubicle({B: 'b', D: 'y', L: 'o'}),
        new Cubicle({B: 'b', D: 'y'}),
        new Cubicle({B: 'b', D: 'y', R: 'r'}),
      ],
      [
        new Cubicle({D: 'y', L: 'o'}),
        new Cubicle({D: 'y'}),
        new Cubicle({D: 'y', R: 'r'}),
      ],
      [
        new Cubicle({F: 'g', D: 'y', L: 'o'}),
        new Cubicle({F: 'g', D: 'y'}),
        new Cubicle({F: 'g', D: 'y', R: 'r'}),
      ]
    ],

  ];
}

Cube.prototype.clamp = function (face) {
  var handle = undefined;

  if (face === 'F') {
    handle = [
      [this.cubicles[0][2][0], this.cubicles[0][2][1], this.cubicles[0][2][2]],
      [this.cubicles[1][2][0], this.cubicles[1][2][1], this.cubicles[1][2][2]],
      [this.cubicles[2][2][0], this.cubicles[2][2][1], this.cubicles[2][2][2]]
    ];
  } else if (face === 'B') {
    handle = [
      [this.cubicles[0][0][2], this.cubicles[0][0][1], this.cubicles[0][0][0]],
      [this.cubicles[1][0][2], this.cubicles[1][0][1], this.cubicles[1][0][0]],
      [this.cubicles[2][0][2], this.cubicles[2][0][1], this.cubicles[2][0][0]]
    ];
  } else if (face === 'R') {
    handle = [
      [this.cubicles[0][2][2], this.cubicles[0][1][2], this.cubicles[0][0][2]],
      [this.cubicles[1][2][2], this.cubicles[1][1][2], this.cubicles[1][0][2]],
      [this.cubicles[2][2][2], this.cubicles[2][1][2], this.cubicles[2][0][2]]
    ];
  } else if (face === 'L') {
    handle = [
      [this.cubicles[0][0][0], this.cubicles[0][1][0], this.cubicles[0][2][0]],
      [this.cubicles[1][0][0], this.cubicles[1][1][0], this.cubicles[1][2][0]],
      [this.cubicles[2][0][0], this.cubicles[2][1][0], this.cubicles[2][2][0]]
    ];
  } else if (face === 'U') {
    handle = [
      [this.cubicles[0][0][0], this.cubicles[0][0][1], this.cubicles[0][0][2]],
      [this.cubicles[0][1][0], this.cubicles[0][1][1], this.cubicles[0][1][2]],
      [this.cubicles[0][2][0], this.cubicles[0][2][1], this.cubicles[0][2][2]]
    ];
  } else if (face === 'D') {
    handle = [
      [this.cubicles[2][0][2], this.cubicles[2][0][1], this.cubicles[2][0][0]],
      [this.cubicles[2][1][2], this.cubicles[2][1][1], this.cubicles[2][1][0]],
      [this.cubicles[2][2][2], this.cubicles[2][2][1], this.cubicles[2][2][0]]
    ];
  } else {
    throw "unknown face to clamp";
  }

  return handle;
}

Cube.rotateClockwise = function (clamp) {
  // rotate corners
  var tmp = clamp[0][0].faces;
  clamp[0][0].faces = clamp[2][0].faces;
  clamp[2][0].faces = clamp[2][2].faces;
  clamp[2][2].faces = clamp[0][2].faces;
  clamp[0][2].faces = tmp;
  // rotate mids
  tmp = clamp[0][1].faces;
  clamp[0][1].faces = clamp[1][0].faces;
  clamp[1][0].faces = clamp[2][1].faces;
  clamp[2][1].faces = clamp[1][2].faces;
  clamp[1][2].faces = tmp;
}

Cube.rotateCounterClockwise = function (clamp) {
  // rotate corners
  var tmp = clamp[0][0].faces;
  clamp[0][0].faces = clamp[0][2].faces;
  clamp[0][2].faces = clamp[2][2].faces;
  clamp[2][2].faces = clamp[2][0].faces;
  clamp[2][0].faces = tmp;
  // rotate mids
  tmp = clamp[0][1].faces;
  clamp[0][1].faces = clamp[1][2].faces;
  clamp[1][2].faces = clamp[2][1].faces;
  clamp[2][1].faces = clamp[1][0].faces;
  clamp[1][0].faces = tmp;
}

Cube.applyToCubicles = function (clamp, rotation) {

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      clamp[i][j].rotate(rotation);
    }
  }
}

Cube.prototype.performMove = function (move) {

  switch (move) {
    case 'F':
    case 'R':
    case 'U':
    case 'L':
    case 'B':
    case 'D':
      var clamp = this.clamp(move)
      Cube.rotateClockwise(clamp);
      Cube.applyToCubicles(clamp, move);
      break;
    case 'f':
    case 'r':
    case 'u':
    case 'l':
    case 'b':
    case 'd':
      var clamp = this.clamp(_.upperCase(move));
      Cube.rotateCounterClockwise(clamp);
      Cube.applyToCubicles(clamp, move);
      break;
    default:
      throw "unknown move";
  }
}

Cube.renderClamp = function (clamp, side) {
  var result = [];
  for (var i = 0; i < 3; i++) {
    result.push([]);
    for (var j = 0; j < 3; j++) {
      result[i].push(clamp[i][j].render(side));
    }
  }
  return result;
}

Cube.prototype.render = function () {
  var result = {};
  Sides.forEach(function (side) {
    result[side] = Cube.renderClamp(this.clamp(side), side);
  }.bind(this));
  return result;
}

module.exports = { Cube: Cube }
