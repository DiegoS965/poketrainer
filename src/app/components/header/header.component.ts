import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { Subscription } from 'rxjs'
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  trainer: Trainer;
  isTrainer: boolean = false;

  constructor(private router: Router, private trainerService: TrainerService){}

  ngOnInit(): void {
    this.trainer = this.trainerService.getTrainer();
    if (this.trainer){
      this.isTrainer = true;
    } else {
      this.isTrainer = false;
    }
  }

  onRedirectDefaultPage() {
    this.router.navigateByUrl('/profile');
  }
}
