import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.sass']
})
export class ProfileCardComponent implements OnInit {
  defaultImageUrl: string = "../../../../assets/icons/default_avatar.png";
  profileIcon: string | ArrayBuffer;
  profileIconName: string;
  isPreview: boolean = false;
  @Input() trainer: Trainer;
  birthdate: Date;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkForCurrentRoute()
    this.birthdate = new Date(this.trainer.birthdate);
  }

  private checkForCurrentRoute(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/configuration/pokemon-selection') {
      this.isPreview = true;
    } else {
      this.isPreview = false;
    }
  }

  /* onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileIconName = file.name;
      this.previewImage(file);
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileIcon = reader.result;
    };
    reader.readAsDataURL(file);
    
  } */
}
