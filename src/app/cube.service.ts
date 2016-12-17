import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs";
import {error} from "util";
import {Measurement} from "./measurement";


@Injectable()
export class CubeService {

  constructor(private http: Http) { }

  getNextScramble() : Observable<string[]> {
    return this.http.get("/scramble").map(res => res.json());
  }

  getAllMeasurements(usertoken: string) : Observable<Measurement[]> {
    return this.http.get("/getMeasurements/" + usertoken).map(res => res.json().measurements);
  }

  postMeasurements(measurements: Measurement[], userToken: string) : Observable<Measurement[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("/addMeasurements", { measurements: measurements, userToken : userToken  }, options).map(res => res.json().measurements);
  }


}
