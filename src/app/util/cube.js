var _ = require('lodash');

const Sides = [ 'F', 'R', 'B', 'L', 'U', 'D'];

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

Cube.prototype.clamp = function(face) {
    var handle = undefined;

    if(face === 'F') {
        handle = [
            [this.cubicles[0][2][0], this.cubicles[0][2][1], this.cubicles[0][2][2]],
            [this.cubicles[1][2][0], this.cubicles[1][2][1], this.cubicles[1][2][2]],
            [this.cubicles[2][2][0], this.cubicles[2][2][1], this.cubicles[2][2][2]]
        ];
    } else if(face === 'B') {
        handle = [
            [this.cubicles[0][0][2], this.cubicles[0][0][1], this.cubicles[0][0][0]],
            [this.cubicles[1][0][2], this.cubicles[1][0][1], this.cubicles[1][0][0]],
            [this.cubicles[2][0][2], this.cubicles[2][0][1], this.cubicles[2][0][0]]
        ];
    } else if(face === 'R') {
        handle = [
            [this.cubicles[0][2][2], this.cubicles[0][1][2], this.cubicles[0][0][2]],
            [this.cubicles[1][2][2], this.cubicles[1][1][2], this.cubicles[1][0][2]],
            [this.cubicles[2][2][2], this.cubicles[2][1][2], this.cubicles[2][0][2]]
        ];
    } else if(face === 'L') {
        handle = [
            [this.cubicles[0][0][0], this.cubicles[0][1][0], this.cubicles[0][2][0]],
            [this.cubicles[1][0][0], this.cubicles[1][1][0], this.cubicles[1][2][0]],
            [this.cubicles[2][0][0], this.cubicles[2][1][0], this.cubicles[2][2][0]]
        ];
    } else if(face === 'U') {
        handle = [
            [this.cubicles[0][0][0], this.cubicles[0][0][1], this.cubicles[0][0][2]],
            [this.cubicles[0][1][0], this.cubicles[0][1][1], this.cubicles[0][1][2]],
            [this.cubicles[0][2][0], this.cubicles[0][2][1], this.cubicles[0][2][2]]
        ];
    } else if(face === 'D') {
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

Cube.prototype.rotateClockwise = function(clamp) {
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

Cube.prototype.rotateCounterClockwise = function(clamp) {
}

Cube.prototype.applyToCubicles = function(clamp, rotation) {

    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            clamp[i][j].rotate(rotation);
        }
    }
}

Cube.prototype.performMove = function (move) {

    switch(move) {
        case 'F':
        case 'R':
        case 'U':
        case 'L':
        case 'B':
        case 'D':
            var clamp = this.clamp(move)
            this.rotateClockwise(clamp);
            this.applyToCubicles(clamp, move);
            break;
        case 'f':
        case 'r':
        case 'u':
        case 'l':
        case 'b':
        case 'd':
            var clamp = this.clamp(_.upperCase(move));
            this.rotateCounterClockwise(clamp);
            this.applyToCubicles(clamp, move);
            break;
        default:
            throw "unknown move";
    }
}

Cube.prototype.renderClamp = function(clamp, side) {

    var buf = "";
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            buf = buf + " " + clamp[i][j].render(side);
        }
        buf = buf + "\n";
    }
    return buf;
}

Cube.prototype.render = function() {
    Sides.forEach(function(side) { console.log(side +": \n" + this.renderClamp(this.clamp(side), side)); }.bind(this));
}

var cube = new Cube();
console.log("*** INITIAL ***")
cube.render();
console.log("*** MOVE F ***")
cube.performMove('F');
cube.render();
console.log("*** MOVE R ***")
cube.performMove('R');
cube.render();
console.log("*** MOVE B ***")
cube.performMove('B');
cube.render();


// var cubicle = new Cubicle({top: 'w', back: 'b', left: 'o'});
// console.log(cubicle);
// cubicle.rotate('xy');
// console.log(cubicle);
// cubicle.rotate('xy');
// console.log(cubicle);
// cubicle.rotate('xy');
// console.log(cubicle);
// cubicle.rotate('xy');
// console.log(cubicle);

