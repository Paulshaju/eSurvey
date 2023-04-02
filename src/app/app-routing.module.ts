import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthService } from './services/auth.service';
import { UserDashboardResolver } from './services/user-dashboard.resolver';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent, 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthService] 
  },
  { 
    path: 'registerUser', 
    component: RegisterUserComponent,
  },
  { 
    path: 'userdashboard', 
    component: UserDashboardComponent,
    resolve:{
      userData: UserDashboardResolver,
    },
    canActivate: [AuthService] 
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    resolve:{
      userData: UserDashboardResolver,
    },
    canActivate: [AuthService] 
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
