import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ProfileCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }