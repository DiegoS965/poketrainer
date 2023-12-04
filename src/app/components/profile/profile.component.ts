import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { Subscription } from 'rxjs';
import { Trainer } from 'src/app/models/trainer.model';
import { Pokemon } from 'src/app/models/pokemon.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {
  isFetching: boolean = true;
  trainer: Trainer;
  private profileDataSubscription: Subscription;
  pokemons: Pokemon[];

  constructor(private activatedRoute: ActivatedRoute,
    private trainerService: TrainerService, private router: Router){}

  ngOnInit(): void {
    this.getProfileDataSubscription();
  }

  onProfileEditButton() {
    this.router.navigate(['/configuration']);
  }

  onPokemonEditButton() {
    this.router.navigate(['/configuration/pokemon-selection']);
  }

  private getProfileDataSubscription(): void {
    this.profileDataSubscription = this.activatedRoute.data.subscribe(({trainer}: { trainer: Trainer })=>{
      this.trainer = trainer;
      this.isFetching = false;
      this.pokemons = trainer.pokemons_owned;
      /* 
      setTimeout(() => {
        this.isFetching = false;
      }, 1000);  //simular 1 segundo de tiempo de carga de datos */
    });
  }

  ngOnDestroy(): void {
    this.profileDataSubscription.unsubscribe();
  }

}
