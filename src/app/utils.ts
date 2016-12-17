var _ = require('lodash');

export class Utils {
  static generateRandomString(): string {
    return "" + new Date().getTime() + "_" + _.random(100000000, 999999999);
  }
}
