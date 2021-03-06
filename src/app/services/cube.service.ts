import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Measurement} from '../measurement';
import {LocalStorageService} from 'ng2-webstorage';

@Injectable()
export class CubeService {

  moves: string[];
  movesPairs: {};
  measurements: BehaviorSubject<Measurement[]>;

  constructor(private localStorage: LocalStorageService) {
    this.moves = ['U', 'L', 'F', 'R', 'B', 'D', 'u', 'l', 'f', 'r', 'b', 'd'];
    this.movesPairs = {
      'U': 'u', 'L': 'l', 'F': 'f', 'R': 'r', 'B': 'b', 'D': 'd',
      'u': 'U', 'l': 'L', 'f': 'F', 'r': 'R', 'b': 'B', 'd': 'D'
    }
    let data = this.localStorage.retrieve('measurements');
    this.measurements = new BehaviorSubject(data ? data : []);
  }

  isInverseMove(m1: string, m2: string) {
    return this.movesPairs[m1] === m2;
  }

  getNextScramble(length: number): string[] {
    let result = [];
    while (result.length < length) {
      let idx = Math.floor(Math.random() * this.moves.length);
      let candidate= this.moves[idx];
      let curLen = result.length;

      // reject cancellations
      if (result.length > 0 && this.isInverseMove(result[curLen - 1], candidate)) {
        continue;
      }

      // reject redundancies
      if (result.length > 1 && result[curLen - 1] === result[curLen - 2] &&  result[curLen - 2] === candidate) {
        continue;
      }

      result.push(candidate);
    }

    return result;
  }

  getAllMeasurements(): Observable<Measurement[]> {
    return this.measurements.asObservable();
  }

  persistMeasurements(measurements: Measurement[]): void {
    this.localStorage.store('measurements', measurements);
    this.measurements.next(measurements);
  }

  clearMeasurements() : void {
      this.measurements.next([]);
  }

}
