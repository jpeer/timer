import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {Options} from "../options";
import {LocalStorageService} from "ng2-webstorage";

@Injectable()
export class OptionsService {

  options = new BehaviorSubject({ scrambleSize: 20, colorTheme: "default" });

  constructor(private localStorage: LocalStorageService) {
    let options = localStorage.retrieve('options');
    if(options) {
      this.options.next(options);
    }
  }

  getOptionsObject() : Observable<Options> {
    return this.options.asObservable();
  }

  updateOptions(options: Options) {
    console.log('updating options!');
    this.options.next(options);

    this.localStorage.store('options', options);
  }

}
