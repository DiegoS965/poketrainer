import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPokemonsComponent } from './user-pokemons.component';

describe('UserPokemonsComponent', () => {
  let component: UserPokemonsComponent;
  let fixture: ComponentFixture<UserPokemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPokemonsComponent]
    });
    fixture = TestBed.createComponent(UserPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
