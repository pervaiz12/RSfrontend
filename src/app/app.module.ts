import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogOutComponent } from './components/auth/log-out/log-out.component';
import { EmployeeComponent } from './components/profile/employee/employee.component';
import { EmploymentComponent } from './components/profile/employment/employment.component';
import { UserInformationComponent } from './components/profile/user-information/user-information.component';
import { QualificationExperienceComponent } from './components/profile/qualification-experience/qualification-experience.component';
import { TimeOffLeaveComponent } from './components/time-off-leave/time-off-leave.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SidebarComponent } from './navbar/sidebar/sidebar.component';
import { HeaderComponent } from './navbar/header/header.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { CreateLeaveRequestComponent } from './components/create-leave-request/create-leave-request.component'
import { DataTablesModule } from 'angular-datatables';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateUserComponent } from './components/admin/update-user/update-user.component';
import { NotificationComponent } from './components/notification/notification.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FrinedComponent } from './components/userfriend/frined/frined.component';
import { FriendRequestsComponent } from './components/userfriend/friend-requests/friend-requests.component';
import { MessageComponent } from './components/userfriend/message/message.component';
import { AllFriendComponent } from './components/userfriend/all-friend/all-friend.component';



// import {MatInputModule} from '@angular/material/input';

//  import {MatPaginatorModule} from '@angular/material/paginator';











@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    LogOutComponent,
    EmployeeComponent,
    EmploymentComponent,
    UserInformationComponent,
    QualificationExperienceComponent,
    TimeOffLeaveComponent,
    SidebarComponent,
    HeaderComponent,
    AdminDashboardComponent,
    LeaveRequestComponent,
    CreateLeaveRequestComponent,
    ListUserComponent,
    UsersListComponent,
    UpdateUserComponent,
    NotificationComponent,
    FrinedComponent,
    FriendRequestsComponent,
    MessageComponent,
    AllFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxPaginationModule,
    InfiniteScrollModule,

   

    // MatAutocompleteModule,
    // MatPaginatorModule,
    // MatAutocompleteModule
    // MatSliderModule


  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
