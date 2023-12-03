import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { ProfileDataResolver } from './resolvers/profile-data.resolver';
import { ProfileDataGuard } from './guards/profile-data.guard';

const routes: Routes = [
  {path: 'configuration', component: AccountFormComponent, resolve: {trainer: ProfileDataResolver}},
  {path: 'configuration/pokemon-selection', component: PokemonListComponent, canActivate: [ProfileDataGuard], resolve: {trainer: ProfileDataResolver}},
  {path: 'profile', component: ProfileComponent, canActivate: [ProfileDataGuard], resolve: {trainer: ProfileDataResolver}},
  {path: '', pathMatch: 'full', redirectTo: 'profile'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
