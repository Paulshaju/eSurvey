import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  switch = 'default'
  totalResponse = 0

  constructor(
    private userSvc:UserService,
    private route:Router,
  ) { }

  ngOnInit(): void {
  }
  logOutClicked(){
    this.userSvc.userEmail=""
    this.route.navigateByUrl('/login')
  }
  changeView(type:string){
    console.log('clicked')
    this.switch = type
  }
  viewTotalResponse(totalresponse:number){
    this.totalResponse = totalresponse
  }

}
