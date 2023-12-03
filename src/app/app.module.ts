import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { HeaderComponent } from './components/header/header.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserPokemonsComponent } from './components/profile/user-pokemons/user-pokemons.component';
import { SharedModule } from './shared/shared.module';
import { DuiFormatDirective } from './components/account-form/dui-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    AccountFormComponent,
    HeaderComponent,
    PokemonListComponent,
    ProfileComponent,
    UserPokemonsComponent,
    DuiFormatDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
