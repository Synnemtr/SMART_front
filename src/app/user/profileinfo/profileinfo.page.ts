import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { RegistrationService } from '../../services/registration/registration.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profileinfo',
  templateUrl: './profileinfo.page.html',
  styleUrls: ['./profileinfo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class ProfileInfoPage implements OnInit {

  sexChoices = [
    { label: 'Man', value: 'MAN' },
    { label: 'Woman', value: 'WOMAN' },
    { label: 'Other', value: 'OTHER' }
  ];
  
  fitnessGoalChoices = [
    { label: 'Lose Weight', value: 1 },
    { label: 'Build Muscle', value: 2 },
    { label: 'Improve Endurance', value: 3 },
    { label: 'Get Stronger', value: 4 },
    { label: 'Stay Fit and Healthy', value: 5 },
    { label: 'Other', value: 6 }
  ];
  
  dietChoices = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Pescatarian', value: 'pescatarian' },
    { label: 'Keto', value: 'keto' },
    { label: 'Paleo', value: 'paleo' },
    { label: 'Gluten-Free', value: 'gluten-free' }
  ];

  profileinfoForm: FormGroup = new FormGroup({});
  updateProfileForm: FormGroup = new FormGroup({});
  public isUpdate: boolean = false;

  selectedGoal: number = 0;
  subGoalChoices: any[] = [];
  
  constructor(
    public modalController: ModalController, 
    private formBuilder:FormBuilder, 
    private service: RegistrationService, 
    private alertController: AlertController,
    private router: Router,
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.isUpdate = this.router.getCurrentNavigation()?.extras?.state?.['isUpdate'];
      } else {
        this.isUpdate = false;
      }
    });
  }

  ngOnInit() {
    if (this.isUpdate) {
      this.updateProfileForm = this.formBuilder.group({
        weight: [''],
        goal: [''],
        sub_goal: [''],
        training_per_week: [''],
        preferred_diet: [''],
      });
    } else { 
      this.profileinfoForm = this.formBuilder.group({
        sex: ['', Validators.required],
        year_of_birth: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
        month_of_birth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        day_of_birth: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
        weight: ['', [Validators.required, Validators.min(0), Validators.max(300)]],
        height: ['', [Validators.required, Validators.min(0), Validators.max(250)]],
        body_fat: [{value: '', disabled: true}],
        total_points: [{value: '', disabled: true}],
        goal: ['', Validators.required],
        sub_goal: ['', Validators.required],
        training_per_week: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
        preferred_diet: ['', Validators.required],
      });
    }
    this.subGoalChoices = [];
  }

  onGoalChange(event: any) {
    this.selectedGoal = event.detail.value;
    this.updateSubGoalChoices();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.profileinfoForm.get('picture')?.setValue(file);
    this.updateProfileForm.get('picture')?.setValue(file);
  }

  updateSubGoalChoices(){
    // TODO: make input of number dynamic
    this.subGoalChoices = [];
    if (this.selectedGoal === 1) {
      this.subGoalChoices.push({ label: 'Lose 5 kg' });
      this.subGoalChoices.push({ label: 'Lose 10 kg' });
      this.subGoalChoices.push({ label: 'Lose 15 kg' });
    } else if (this.selectedGoal === 2) {
      this.subGoalChoices.push({ label: 'Gain 5 kg' });
      this.subGoalChoices.push({ label: 'Gain 10 kg'});
      this.subGoalChoices.push({ label: 'Gain 15 kg' });
    } else if (this.selectedGoal === 3) {
      this.subGoalChoices.push({ label: 'Run 5 km' });
      this.subGoalChoices.push({ label: 'Run 10 km' });
      this.subGoalChoices.push({ label: 'Run 15 km' });
    } else if (this.selectedGoal === 4) {
      this.subGoalChoices.push({ label: 'Increase strength by 5 kg' });
      this.subGoalChoices.push({ label: 'Increase strength by 10 kg' });
      this.subGoalChoices.push({ label: 'Increase strength by 15 kg' });
    } else if (this.selectedGoal === 5) {
      this.subGoalChoices.push({ label: 'Maintain current weight' });
      this.subGoalChoices.push({ label: 'Sleep 8 hours a night' });
      this.subGoalChoices.push({ label: 'Eat 5 fruits or vegetables a day' });
      this.subGoalChoices.push({ label: 'Walk 10 000 steps a day'});
    } else if (this.selectedGoal === 6) {
      this.subGoalChoices.push({ label: 'Other sub-goal' });
    }
  }

  async registerProfileInfo() {
    if (this.profileinfoForm.valid) {
      let profileInfoData: any = new FormData();
      // Format date_of_birth
      let year = this.profileinfoForm.get('year_of_birth')?.value;
      let month = this.profileinfoForm.get('month_of_birth')?.value;
      let day = this.profileinfoForm.get('day_of_birth')?.value;
      let date_of_birth = `${year}-${month}-${day}`;
      profileInfoData.append('date_of_birth', date_of_birth);

      Object.keys(this.profileinfoForm.controls).forEach(formControlName => {
        if (['year_of_birth', 'month_of_birth', 'day_of_birth'].includes(formControlName)) {
          return;
        }
        if (formControlName === 'picture') {
          profileInfoData.append('picture', this.profileinfoForm.get('picture')?.value, 'profile_picture.jpg');
        } else {
          profileInfoData.append(formControlName, this.profileinfoForm.get(formControlName)!.value);
        }
      }); 
      this.service.registerProfileInfo(profileInfoData).subscribe({
        next: () => {
          this.router.navigate(['/gq']);
          this.dismiss();
        },
        error: (e) => this.formFailed(e.error)
      });
    }  
  }

  async updateProfile() {
    if (this.updateProfileForm.valid) {
      let updateProfileData: any = new FormData();
      Object.keys(this.updateProfileForm.controls).forEach((key) => {
        const control = this.updateProfileForm.get(key);
        if (control && control.value && control.value !== '') {
          if (key === 'picture') {
            updateProfileData.append('picture', control.value, 'profile_picture.jpg');
          } else {
            updateProfileData.append(key, control.value);
          }
        }
      });

      this.profileService.getProfile().subscribe((currentProfileData: any) => {
        for (let pair of updateProfileData.entries()) {
          currentProfileData[pair[0]] = pair[1];
        }

        this.profileService.updateProfile(currentProfileData).subscribe({
          next: (response: any) => {
            console.log(response);
            this.router.navigate(['/tabs/profile']);
            this.dismiss();
          },
          error: (e) => console.log(e.error),
        });
      });
    }
  }

  async dismiss() {
    await this.modalController.dismiss()
  }

  async formFailed(error: any) {
    const alert = await this.alertController.create({
      header: "Registration Error",
      subHeader: "",
      message: "The registration failed. Please try again !",
      buttons: ['Close'],
    });

    await alert.present();
  }

}