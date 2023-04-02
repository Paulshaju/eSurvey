import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(
    private cookieSvc: CookieService,
    private userSvc: UserService
  ) { }

  setCookies(email: string) {
    this.cookieSvc.set('survey', email.trim(),undefined,undefined,undefined,true,undefined)
  }
  checkCookies(email: string): boolean {
    return this.cookieSvc.check('survey')
  }
  getCookies() {
    var nameEQ = 'survey' + "=";
    var ca = document.cookie.split(';');
    var cookies
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) {
        cookies = c.substring(nameEQ.length, c.length);
        if (cookies.length > 0) {
          
          this.userSvc.userEmail = decodeURIComponent(cookies.toString())
        }
      }

    }
    // var encrcookies = this.cookieSvc.get('suvery')
    // console.log(encrcookies)

    // this.userSvc.userEmail = CryptoJS.AES.decrypt(encrcookies,this.key).toString()

  }
  deleteCookies(email: string): boolean {
    this.cookieSvc.delete('survey')
    if (this.checkCookies(email)) {
      return true
    }
    return false
  }
}
