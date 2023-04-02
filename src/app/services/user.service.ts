import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserData} from '../models/user.model';

const apiPort = 'https://esurveyapi.herokuapp.com/apis'
const apiEndpoints = {
  registerUser: `${apiPort}/users`,
  loginUser: `${apiPort}/login`,
  getUserDetails:`${apiPort}/getuserdetails`,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEmail:string = ''
  constructor(
    private http:HttpClient
  ) { }

  registerNewUser(newUser:UserData.registerUserModel[]):Observable<any>{
    return this.http.post<any>(apiEndpoints.registerUser,newUser)
  }
  loginUser(loginUserData:UserData.userLogin):Observable<any>{
    return this.http.post<any>(apiEndpoints.loginUser,loginUserData)
  }
  getUserDetails(email:string):Observable<UserData.getUserData[]>{
    let params = new HttpParams().set('email', email);
    return this.http.get<UserData.getUserData[]>(apiEndpoints.getUserDetails,{ params: params })
  }
}
