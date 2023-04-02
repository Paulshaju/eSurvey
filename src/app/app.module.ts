import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { NavbarComponent } from './dashboards/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SurveyquestionsComponent } from './dashboards/surveyquestions/surveyquestions.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthService } from './services/auth.service';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { ScatterChartComponent } from './dashboards/admin-dashboard/scatter-chart/scatter-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { AddQuestionsComponent } from './dashboards/admin-dashboard/add-questions/add-questions.component';
import { EditQuestionsComponent } from './dashboards/admin-dashboard/edit-questions/edit-questions.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditQuestionFormComponent } from './dashboards/admin-dashboard/edit-questions/edit-question-form/edit-question-form.component';
import { ViewResponseComponent } from './dashboards/admin-dashboard/view-response/view-response.component';
import { ViewOptionResponseComponent } from './dashboards/admin-dashboard/view-response/view-option-response/view-option-response.component';
import {MatTooltipModule} from '@angular/material/tooltip';

// import { MatToolbar } from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    UserDashboardComponent,
    NavbarComponent,
    SurveyquestionsComponent,
    AdminDashboardComponent,
    ScatterChartComponent,
    AddQuestionsComponent,
    EditQuestionsComponent,
    EditQuestionFormComponent,
    ViewResponseComponent,
    ViewOptionResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressBarModule,
    NgChartsModule,
    MatExpansionModule,
    MatTooltipModule
  ], 
  providers: [MatDatepickerModule,{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},AuthService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
