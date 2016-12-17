import { Injectable } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Utils} from './utils';

@Injectable()
export class AuthService {

  /* todo: consider keeping local copy here to not always have to reach into cookie jar? */

  constructor(private cookiesService : CookieService) { }

  public getUserToken(): string {
    var userToken = this.cookiesService.get("usertoken");
    if(userToken === undefined) {
      userToken = Utils.generateRandomString();
      this.cookiesService.put("usertoken", userToken);
    }
    return userToken;  }

}
