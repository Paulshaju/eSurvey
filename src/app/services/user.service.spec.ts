
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let http: HttpClient
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(userService).toBeDefined();
    expect(http).toBeDefined();
  });

  it('login Api', () => {
    const testData = {
      result: true, message: "Successfull login", admin: false
    }
    const inputData = {
      email: 'admin',
      password: 'admin',
    }

    userService.loginUser(inputData).subscribe((result) => {
      expect(result).toBe(testData)
    })

    const req = httpController.expectOne('http://localhost:3000/apis/login')

    expect(req.request.method).toEqual('POST')
    req.flush(testData)
  })

  it('login Api Fails', () => {
    const emsg = 'status 500 error'
    const inputData = {
      email: 'admin',
      password: 'admin',
    }

    userService.loginUser(inputData).subscribe((result) => {
      fail('should have failed')
    },(err:HttpErrorResponse)=>{
      expect(err.status).toEqual(500,'status')
      expect(err.error).toEqual(emsg,'message')
    })

    const req = httpController.expectOne('http://localhost:3000/apis/login')

    expect(req.request.method).toEqual('POST')
    req.flush(emsg,{status:500,statusText:'server Error'})
  })
});
