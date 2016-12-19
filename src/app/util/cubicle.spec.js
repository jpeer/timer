'use strict'

var expect = require('chai').expect;
var assert = require('assert');
var Cubicle = require('./cubicle').Cubicle;

describe('Cubicle', function() {

  it('rotate corner 020 => L', function() {

    var c = new Cubicle({U:'w', L:'o', F:'g'});
    assert.deepEqual(c.faces, { U: 'w', L: 'o', F: 'g' });

    c.rotate('l');
    assert.deepEqual(c.faces, { U: 'g', L: 'o', B: 'w' });

    // back to initial pos
    c.rotate('L');
    assert.deepEqual(c.faces, { U: 'w', L: 'o', F: 'g' });
  });

  it('rotate corner 020 => F', function() {

    var c = new Cubicle({U:'w', L:'o', F:'g'});
    assert.deepEqual(c.faces, { U: 'w', L: 'o', F: 'g' });

    c.rotate('F');
    assert.deepEqual(c.faces, { U: 'o', R: 'w', F: 'g' });

    // back to initial pos
    c.rotate('f');
    assert.deepEqual(c.faces, { U: 'w', L: 'o', F: 'g' });
  });

  it('rotate middle 021 => F', function() {

    var c = new Cubicle({U:'w', F:'g'});
    assert.deepEqual(c.faces, {U:'w', F:'g'});

    c.rotate('F');
    assert.deepEqual(c.faces, { R: 'w', F: 'g' });

    // back to initial pos
    c.rotate('f');
    assert.deepEqual(c.faces, {U:'w', F:'g'});
  });

  it('rotate corner 202 => R', function() {

    var c = new Cubicle({B:'b', D:'y', R:'r'});
    assert.deepEqual(c.faces, {B:'b', D:'y', R:'r'});

    c.rotate('R');
    assert.deepEqual(c.faces, { F: 'y', D:'b', R: 'r' });

    c.rotate('R');
    assert.deepEqual(c.faces, { F: 'b', U:'y', R: 'r' });

    c.rotate('R');
    assert.deepEqual(c.faces, { U: 'b', B:'y', R: 'r' });

    // back to initial pos
    c.rotate('R');
    assert.deepEqual(c.faces, {B:'b', D:'y', R:'r'});

    //

    var c = new Cubicle({B:'b', D:'y', R:'r'});
    assert.deepEqual(c.faces, {B:'b', D:'y', R:'r'});

    c.rotate('r');
    assert.deepEqual(c.faces, { U: 'b', B:'y', R: 'r' });

    c.rotate('r');
    assert.deepEqual(c.faces, { F: 'b', U:'y', R: 'r' });

    c.rotate('r');
    assert.deepEqual(c.faces, { F: 'y', D:'b', R: 'r' });

    // back to initial pos
    c.rotate('r');
    assert.deepEqual(c.faces, {B:'b', D:'y', R:'r'});

  });

  it('rotate corner 202 => B', function() {

    var c = new Cubicle({B:'b', D:'y', R:'r'});
    assert.deepEqual(c.faces, {B:'b', D:'y', R:'r'});

    c.rotate('B');
    assert.deepEqual(c.faces, { U: 'r', R:'y', B: 'b' });

    c.rotate('B');
    assert.deepEqual(c.faces, { U: 'y', L:'r', B: 'b' });

    c.rotate('B');
    assert.deepEqual(c.faces, { B: 'b', L:'y', D: 'r' });

    // back to initial pos
    c.rotate('B');
    assert.deepEqual(c.faces, {B:'b', D:'y', R:'r'});

    c.rotate('b');
    assert.deepEqual(c.faces, { B: 'b', L:'y', D: 'r' });

    c.rotate('b');
    assert.deepEqual(c.faces, { U: 'y', L:'r', B: 'b' });

    c.rotate('b');
    assert.deepEqual(c.faces, { U: 'r', R:'y', B: 'b' });

    // back to initial pos
    c.rotate('b');
    assert.deepEqual(c.faces, {B:'b', D:'y', R:'r'});


  });


});
