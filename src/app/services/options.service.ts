import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {Options} from "../options";

@Injectable()
export class OptionsService {

  options = new BehaviorSubject({ scrambleSize: 20, colorTheme: "default" });

  getOptionsObject() : Observable<Options> {
    return this.options.asObservable();
  }

  updateOptions(options: Options) {
    console.log('updating options!');
    this.options.next(options);
  }

}
