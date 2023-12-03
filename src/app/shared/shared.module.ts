import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    LoadingComponent,
    ProfileCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoadingComponent,
    ProfileCardComponent
  ]
})
export class SharedModule { }