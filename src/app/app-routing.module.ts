import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOutComponent } from './components/auth/log-out/log-out.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { EmployeeComponent } from './components/profile/employee/employee.component';
import { EmploymentComponent } from './components/profile/employment/employment.component';
import { UserInformationComponent } from './components/profile/user-information/user-information.component';
import { QualificationExperienceComponent } from './components/profile/qualification-experience/qualification-experience.component';
import { TimeOffLeaveComponent } from './components/time-off-leave/time-off-leave.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { CreateLeaveRequestComponent } from './components/create-leave-request/create-leave-request.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },

  { path: 'logout', component: LogOutComponent },
  { path: 'createLeaveRequest', component: CreateLeaveRequestComponent ,canActivate: [AuthGuard]},
  { path: 'create', component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "admindashboard", component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: "approvedleave", component: LeaveRequestComponent, canActivate: [AuthGuard] },

  { path: "employee", component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: "employment", component: EmploymentComponent, canActivate: [AuthGuard] },
  { path: "userInformation", component: UserInformationComponent, canActivate: [AuthGuard] },
  { path: "qualification", component: QualificationExperienceComponent, canActivate: [AuthGuard] },
  { path: "leaverequest", component: TimeOffLeaveComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
