'use strict'

var expect = require('chai').expect;
var Cube = require('./cube').Cube;
var assert = require('assert');

describe('Cube clamp rotation', function () {

  it('rotate clockwise', function () {

    var clamp = [
      [{faces: "1"}, {faces: "2"}, {faces: "3"}],
      [{faces: "4"}, {faces: "5"}, {faces: "6"}],
      [{faces: "7"}, {faces: "8"}, {faces: "9"}]
    ]

    Cube.rotateClockwise(clamp);

    assert.deepEqual(clamp,
      [
        [{faces: "7"}, {faces: "4"}, {faces: "1"}],
        [{faces: "8"}, {faces: "5"}, {faces: "2"}],
        [{faces: "9"}, {faces: "6"}, {faces: "3"}]
      ]);

    Cube.rotateCounterClockwise(clamp);

    assert.deepEqual(clamp,
      [
        [{faces: "1"}, {faces: "2"}, {faces: "3"}],
        [{faces: "4"}, {faces: "5"}, {faces: "6"}],
        [{faces: "7"}, {faces: "8"}, {faces: "9"}],
      ]);

  });

  it('rotate counterclockwise', function () {

    var clamp = [
      [{faces: "1"}, {faces: "2"}, {faces: "3"}],
      [{faces: "4"}, {faces: "5"}, {faces: "6"}],
      [{faces: "7"}, {faces: "8"}, {faces: "9"}],
    ]

    Cube.rotateCounterClockwise(clamp);

    assert.deepEqual(clamp,
      [
        [{faces: "3"}, {faces: "6"}, {faces: "9"}],
        [{faces: "2"}, {faces: "5"}, {faces: "8"}],
        [{faces: "1"}, {faces: "4"}, {faces: "7"}],
      ]);

    Cube.rotateClockwise(clamp);

    assert.deepEqual(clamp,
      [
        [{faces: "1"}, {faces: "2"}, {faces: "3"}],
        [{faces: "4"}, {faces: "5"}, {faces: "6"}],
        [{faces: "7"}, {faces: "8"}, {faces: "9"}],
      ]);

  });

});


describe('clamps get attached properly', function () {
  it('attach clamp', function () {

    var cube = new Cube();
    var clamp = cube.clamp('F');
    assert.deepEqual(Cube.renderClamp(clamp, 'F'), [['g', 'g', 'g'], ['g', 'g', 'g'], ['g', 'g', 'g']]);

    clamp = cube.clamp('L');
    assert.deepEqual(Cube.renderClamp(clamp, 'L'), [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']]);

    clamp = cube.clamp('R');
    assert.deepEqual(Cube.renderClamp(clamp, 'R'), [['r', 'r', 'r'], ['r', 'r', 'r'], ['r', 'r', 'r']]);

    clamp = cube.clamp('B');
    assert.deepEqual(Cube.renderClamp(clamp, 'B'), [['b', 'b', 'b'], ['b', 'b', 'b'], ['b', 'b', 'b']]);

    clamp = cube.clamp('U');
    assert.deepEqual(Cube.renderClamp(clamp, 'U'), [['w', 'w', 'w'], ['w', 'w', 'w'], ['w', 'w', 'w']]);

    clamp = cube.clamp('D');
    assert.deepEqual(Cube.renderClamp(clamp, 'D'), [['y', 'y', 'y'], ['y', 'y', 'y'], ['y', 'y', 'y']]);

    cube.render();
  });
});


describe('cube moves', function () {

  it('test full rotations', function () {

    var cube = new Cube();
    var initialState = cube.render();

    ['F', 'R', 'B', 'L', 'U', 'D', 'f', 'r', 'b', 'l', 'u', 'd'].forEach(function (move) {
        for (var i = 0; i < 4; i++) {
          cube.performMove(move);
          if (i < 3) {
            assert.notDeepEqual(initialState, cube.render())
          } else {
            assert.deepEqual(initialState, cube.render())
          }
        }
      }
    );
  });


  it('test RUF rotation', function() {
    var cube= new Cube();

    var initialState = cube.render();

    cube.performMove('R');
    cube.performMove('U');
    cube.performMove('F');

    assert.deepEqual(
      { F: [ [ 'g', 'g', 'r' ], [ 'g', 'g', 'r' ], [ 'y', 'y', 'r' ] ],
        R: [ [ 'g', 'b', 'b' ], [ 'g', 'r', 'r' ], [ 'g', 'r', 'r' ] ],
        B: [ [ 'o', 'o', 'o' ], [ 'w', 'b', 'b' ], [ 'w', 'b', 'b' ] ],
        L: [ [ 'g', 'g', 'y' ], [ 'o', 'o', 'y' ], [ 'o', 'o', 'b' ] ],
        U: [ [ 'w', 'w', 'w' ], [ 'w', 'w', 'w' ], [ 'o', 'o', 'y' ] ],
        D: [ [ 'b', 'y', 'y' ], [ 'b', 'y', 'y' ], [ 'w', 'r', 'r' ] ] },
      cube.render()
    );

    cube.performMove('f');
    cube.performMove('u');
    cube.performMove('r');

    assert.deepEqual(initialState, cube.render());
  });

  it('test FUR rotation', function() {
    var cube= new Cube();

    var initialState = cube.render();

    cube.performMove('F');
    cube.performMove('U');
    cube.performMove('R');

    assert.deepEqual(
      { F: [ [ 'w', 'r', 'r' ], [ 'g', 'g', 'y' ], [ 'g', 'g', 'y' ] ],
        R: [ [ 'w', 'w', 'b' ], [ 'r', 'r', 'b' ], [ 'r', 'r', 'b' ] ],
        B: [ [ 'w', 'o', 'y' ], [ 'w', 'b', 'b' ], [ 'w', 'b', 'b' ] ],
        L: [ [ 'g', 'g', 'g' ], [ 'o', 'o', 'y' ], [ 'o', 'o', 'y' ] ],
        U: [ [ 'o', 'w', 'r' ], [ 'o', 'w', 'g' ], [ 'o', 'w', 'g' ] ],
        D: [ [ 'o', 'y', 'y' ], [ 'b', 'y', 'y' ], [ 'b', 'r', 'r' ] ] },
      cube.render());

    cube.performMove('r');
    cube.performMove('u');
    cube.performMove('f');

    assert.deepEqual(initialState, cube.render());
  });


});
