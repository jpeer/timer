import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

let Cube = require('../util/cube').Cube;

@Component({
  selector: 'app-scramble',
  templateUrl: './scramble.component.html',
  styleUrls: ['./scramble.component.css']
})
export class ScrambleComponent {

  _scramble : string[];
  rc : {}; // rc = rendered cube

  constructor() {
    this.rc = new Cube().render();
  }

  @Input()
  set scramble(value : string[]) {
    this._scramble = value;
    let cube = new Cube();
    for(let i = 0; i < value.length; i++) {
      cube.performMove(value[i]);
    }
    this.rc = cube.render();
  }

  get scramble() : string[] {
    return this._scramble;
  }

}
