import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Measurement} from './measurement';
import {LocalStorageService} from 'ng2-webstorage';


@Injectable()
export class CubeService {

  constructor(private localStorage: LocalStorageService) { }

  getNextScramble() : string[] {
    var moves = [ 'U', 'L', 'F', 'R', 'B', 'D', 'u', 'l', 'f', 'r', 'b', 'd'  ];

    var result = [];
    for(var i = 0; i < 25; i++) {
      var idx = Math.floor(Math.random() * moves.length);
      result.push(moves[idx]);
    }

    return result;
  }

  getAllMeasurements() : Observable<Measurement[]> {
    return Observable.create(function(observer) {
      observer.next(this.localStorage.retrieve('measurements'));
      observer.complete();
    }.bind(this));
  }

  persistMeasurements(measurements: Measurement[]) : void {
    this.localStorage.store('measurements', measurements);
  }

}
