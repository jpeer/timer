import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Measurement} from "./measurement";
import {LocalStorageService} from "ng2-webstorage";


@Injectable()
export class CubeService {

  constructor(private localStorage: LocalStorageService) { }

  getNextScramble() : string[] {
    var moves = [ "U", "L", "F", "R", "B", "D", "U'", "L'", "F'", "R'", "B'", "D'"  ];

    var result = [];
    for(var i = 0; i < 20; i++) {
      var idx = Math.floor(Math.random() * moves.length);
      result.push(moves[idx]);
    }

    return result;
  }

  getAllMeasurements() : Observable<Measurement[]> {
    return Observable.create(function(observer) {
      observer.next(this.localStorage.retrieve("measurements"));
      observer.complete();
    }.bind(this));
  }

  persistMeasurements(measurements: Measurement[]) : void {
    this.localStorage.store("measurements", measurements);
  }


}
