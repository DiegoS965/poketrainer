import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.sass']
})
export class AccountFormComponent implements OnInit, OnDestroy {
  isMinor: boolean = false;
  editMode: boolean = false;
  form: FormGroup;
  maxDate: Date;
  defaultImageUrl: string = "../../../assets/icons/default_avatar.png";
  profileIcon: string | ArrayBuffer;
  profileIconName: string;
  isFetching: boolean = true;
  trainer: Trainer;
  birthDaySubscription: Subscription;
  profileDataSubscription: Subscription;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private trainerService: TrainerService, private router: Router) {}

  ngOnInit() {
    this.maxDate = new Date;
    this.form = this.fb.group({
      name: ['', Validators.required],
      hobbies: [''],
      birthday: [null, Validators.required],
      dui: [null, [this.customDuiValidator]],
      minors_id: [null]
    });

    this.birthDaySubscription = this.form.get('birthday').valueChanges.subscribe((value) => {
      this.isMinor = this.calculateAge(value) < 18;
      this.updateDuiValidator();
    });

    this.profileDataSubscription = this.activatedRoute.data.subscribe(({trainer}: { trainer: Trainer })=>{
      setTimeout(() => {
        this.isFetching = false;
      }, 1000);  //simular 1 segundo de tiempo de carga de datos
      if (trainer === null) {
        this.editMode = false;
        this.trainer = null;
      } else {
        this.editMode = true;
        this.trainer = trainer;
        this.form.patchValue({
          name: trainer.name,
          hobbies: trainer.hobbies,
          birthday: trainer.birthdate,
          dui: trainer.dui,
          minors_id: trainer.minors_id
        });
      }
    })

  }

  onSubmit() {
    if (this.editMode) {
      this.trainer.name = this.form.get('name').value;
      this.trainer.hobbies = this.form.get('hobbies').value;
      this.trainer.birthdate = this.form.get('birthday').value;
      this.trainer.dui = this.form.get('dui').value;
      this.trainer.minors_id = this.form.get('minors_id').value;
      this.trainer.image_path = this.profileIcon ? this.profileIcon as string : this.defaultImageUrl;
      this.trainerService.storeTrainer(this.trainer);
      this.router.navigate(['/profile']);
    } else {
      this.trainer = new Trainer(
        this.form.get('name').value,
        uuidv4(),
        this.profileIcon ? this.profileIcon as string : this.defaultImageUrl,
        this.form.get('hobbies').value,
        this.form.get('birthday').value,
        this.form.get('dui').value,
        this.form.get('minors_id').value,
        null,
      );
      this.trainerService.storeTrainer(this.trainer);
      this.router.navigate(['/configuration/pokemon-selection']);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileIconName = file.name;
      this.previewImage(file);
    }
  }

  ngOnDestroy(): void {
    this.birthDaySubscription.unsubscribe();
    this.profileDataSubscription.unsubscribe();
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileIcon = reader.result;
    };
    reader.readAsDataURL(file);
    
  }

  private updateDuiValidator() {
    const duiControl = this.form.get('dui');
    if (duiControl) {
      if (this.isMinor) {
        duiControl.clearValidators();
      } else {
        duiControl.setValidators([Validators.required, this.customDuiValidator]);
      }
      duiControl.updateValueAndValidity();
    }
  }

  private customDuiValidator() {
    return (control) => {
      const value = control.value;
      if (value) {
        const pattern = /^\d{8}-\d{1}$/;
        const isValid = pattern.test(value);
        return isValid ? null : { invalidDuiNumber: true };
      }
      return null;
    };
  }

  private calculateAge(birthday: Date): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}


