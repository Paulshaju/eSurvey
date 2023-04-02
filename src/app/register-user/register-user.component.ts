import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { CookiesService } from '../services/cookies.service';
import { UserService } from '../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  registrationForm!: FormGroup
  hide = true
  hideConfirm = true
  newUsers: UserData.registerUserModel[] = []
  maxDate!: Date
  matcher = new MyErrorStateMatcher();
  agreementRead = false
  creatingUser = false


  constructor(
    private userSvc: UserService,
    private route:Router,
    private _snackBar:MatSnackBar,
    private cookieSvc:CookiesService
  ) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      fullName: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z ]+$")]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      SNINumber: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{8}$')]),
      password: new FormControl('', [Validators.required]),
      agreementRead: new FormControl(false,[Validators.pattern('true')])
    })
  }
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    
    let checking
    console.log(checking)
    
    if (this.registrationForm && this.registrationForm.get('password')?.value && this.registrationForm.get('confirmPassword')?.value) {
      let pass = this.registrationForm.get('password')?.value;
      let confirmPass = this.registrationForm.get('confirmPassword')?.value
      return pass === confirmPass ? null : { notSame: true }
    }
    return {notsame : false}


  }
  toogleChange(event:MatCheckboxChange){
    if(event.checked){
      this.agreementRead = true
    }

  }
  onSubmit() {
    // console.log(this.registrationForm.get('agreementRead')?.value)
    this.creatingUser = true
    if(this.registrationForm.valid){
      let newUser: UserData.registerUserModel = {
        email: this.registrationForm.get('userEmail')?.value,
        fullName: this.registrationForm.get('fullName')?.value,
        dob: this.registrationForm.get('dob')?.value,
        address: this.registrationForm.get('address')?.value,
        SNINumber: this.registrationForm.get('SNINumber')?.value,
        password: this.registrationForm.get('password')?.value,
        admin:false
      }
      // console.log(newUser)
      this.newUsers.push(newUser)
      this.userSvc.registerNewUser(this.newUsers).subscribe((result: any) => {
        this.userSvc.userEmail= this.newUsers[0].email
        this._snackBar.open('User creation successful!!')
        this.cookieSvc.setCookies(this.userSvc.userEmail)
        this.route.navigateByUrl('/userdashboard')
        this.creatingUser = false

      }, (_err: HttpErrorResponse) => {
        this.newUsers = []
        if(_err.status === 303){
          this.creatingUser = false 
        this._snackBar.open('Email address already in use.')
        }
        else{
          this.creatingUser = false 
          this._snackBar.open('User creation unsuccessfull.Please try again later')
        }
        
      })
    } 
  }

}
