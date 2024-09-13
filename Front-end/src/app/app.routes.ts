import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ManagetasksComponent } from './components/managetasks/managetasks.component';
import { ManageusersComponent } from './components/manageusers/manageusers.component';
import { NgModule } from '@angular/core';
import { LoghoursComponent } from './components/loghours/loghours.component';
import { authGuard } from './guards/auth/auth.guard';
import { adminGuard } from './guards/admin/admin.guard';
import { notloggedinGuard } from './guards/notloggedin/notloggedin.guard';
import { TestComponent } from './components/test/test.component';
import { HoursComponent } from './components/hours/hours.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/forgotpassword/resetpassword/resetpassword.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TasksComponent },
      {
        path: 'managetasks',
        component: ManagetasksComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manageusers',
        component: ManageusersComponent,
        canActivate: [adminGuard],
      },
      { path: 'hours', component: HoursComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [notloggedinGuard],
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [notloggedinGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotpasswordComponent,
    canActivate: [notloggedinGuard],
  },
  // {
  //   path: 'reset-password',
  //   component: ResetpasswordComponent,
  //   canActivate: [notloggedinGuard],
  // },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
