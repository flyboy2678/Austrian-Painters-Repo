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
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'managetasks', component: ManagetasksComponent },
      { path: 'manageusers', component: ManageusersComponent },
      { path: 'loghours', component: LoghoursComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
