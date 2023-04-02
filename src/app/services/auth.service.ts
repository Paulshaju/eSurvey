import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from './cookies.service';
import { UserService } from './user.service';


@Injectable()
export class AuthService implements CanActivate{

  constructor(
    private userSvc:UserService,
    private route:Router,
    private cookieSvc:CookiesService
  ) { }

  canActivate():boolean {
    if(!this.cookieSvc.checkCookies(this.userSvc.userEmail)){
      this.route.navigateByUrl('/login')
      return false
    }
    
    this.cookieSvc.getCookies()
    return true
  }
  
}
