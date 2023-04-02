import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserData } from '../models/user.model';
import { UserService } from './user.service';
import { catchError, map, mergeMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserDashboardResolver implements Resolve<any> {

  constructor(private userSvc:UserService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserData.getUserData> | Promise<UserData.getUserData> | any {
    return this.userSvc.getUserDetails(this.userSvc.userEmail).pipe(
      catchError(err => of({ userData: null, error: err })),
    )
  }
}


