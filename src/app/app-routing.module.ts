import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'configuration', component: AccountFormComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', pathMatch: 'full', redirectTo: 'profile'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
