function Cubicle(faces) {
  this.faces = faces;
}

Cubicle.prototype.chainRot = function (chain) {
  var len = chain.length;
  var tmp = this.faces[chain[len - 1]];
  for (var i = len - 1; i > 0; i--) {
    this.faces[chain[i]] = this.faces[chain[i - 1]];
  }
  this.faces[chain[0]] = tmp;
}

Cubicle.prototype.rotate = function (rot) {

  if (rot === 'U') {
    this.chainRot(['F', 'L', 'B', 'R']);
  } else if (rot === 'F') {
    this.chainRot(['U', 'R', 'D', 'L']);
  } else if (rot === 'R') {
    this.chainRot(['U', 'B', 'D', 'F']);
  } else if (rot === 'L') {
    this.chainRot(['U', 'F', 'D', 'B']);
  } else if (rot === 'B') {
    this.chainRot(['U', 'L', 'D', 'R']);
  } else if (rot === 'D') {
    this.chainRot(['F', 'R', 'B', 'L']);
  } else if (rot === 'u') {
    this.chainRot(['F', 'L', 'B', 'R'].reverse());
  } else if (rot === 'f') {
    this.chainRot(['U', 'R', 'D', 'L'].reverse());
  } else if (rot === 'r') {
    this.chainRot(['U', 'B', 'D', 'F'].reverse());
  } else if (rot === 'l') {
    this.chainRot(['U', 'F', 'D', 'B'].reverse());
  } else if (rot === 'b') {
    this.chainRot(['U', 'L', 'D', 'R'].reverse());
  } else if (rot === 'd') {
    this.chainRot(['F', 'R', 'B', 'L'].reverse());
  } else {
    throw 'unknown cubicle rotation';
  }

  // cleanup
  ['F', 'B', 'R', 'L', 'D', 'U'].forEach(function (face) {
    if (this.faces[face] === undefined) {
      delete this.faces[face];
    }
  }.bind(this));
}

Cubicle.prototype.render = function (face) {
  return this.faces[face];
}

module.exports = { Cubicle : Cubicle };
