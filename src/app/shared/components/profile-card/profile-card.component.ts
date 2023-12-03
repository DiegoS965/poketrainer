import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.sass']
})
export class ProfileCardComponent {
  defaultImageUrl: string = "../../../../assets/icons/default_avatar.png";
  profileIcon: string | ArrayBuffer;
  profileIconName: string;

  onFileSelected(event: any): void {
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
    
  }
}
