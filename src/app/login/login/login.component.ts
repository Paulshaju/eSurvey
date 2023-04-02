import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  getStarted = false
  loginClicked = false
  loginForm!: FormGroup
  hide = true
  loginFailed = false
  logginIn = false

  constructor(
    private route: Router,
    private userSvc: UserService,
    private _snackBar: MatSnackBar,
    private cookieSvc: CookiesService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    })
  }
  getStartedClicked() {
    this.getStarted = !this.getStarted
  }
  getErrorMessage() {
    if (this.loginForm.controls['userEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['userEmail'].hasError('email') ? 'Not a valid email' : '';
  }
  onSubmit() {
    this.logginIn = true
    if (this.loginForm.valid) {
      let loginUserData: UserData.userLogin = {
        email: this.loginForm.get('userEmail')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.userSvc.loginUser(loginUserData).subscribe((result: UserData.loginResult) => {
        if (result) {
          if (result.admin) {
            this.cookieSvc.setCookies(loginUserData.email)
            this.userSvc.userEmail = this.loginForm.get('userEmail')?.value
            this.route.navigateByUrl('/admin')
          }
          else {
            console.log(loginUserData.email)
            this.cookieSvc.setCookies(loginUserData.email)
            console.log("navidations")
            this.userSvc.userEmail = this.loginForm.get('userEmail')?.value
            this.route.navigateByUrl('/userdashboard')
          }


          // this.logginIn = false
        }
        else {
          this.loginFailed = true
          this.logginIn = false
          this._snackBar.open('Login Failed');
        }
      }, () => {
        this.loginFailed = true
        this.logginIn = false
        this._snackBar.open('Login Failed');
      })

    }

  }
  registerUser() {
    this.route.navigateByUrl('/registerUser')
  }


}
