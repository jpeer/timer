import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from "rxjs";


@Injectable()
export class CubeService {

  constructor(private http: Http) { }

  getNextScramble() : Observable<string[]> {
    return this.http.get("/scramble").map(res => res.json());
  }

}
