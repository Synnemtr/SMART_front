import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProfileService } from '../../services/profile/profile.service';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-personal',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PersonalDataPage implements OnInit {
  profile: any;
  user: any

  constructor(
    private profileService: ProfileService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController, 
    ) { }

  ngOnInit() {
    this.getProfile()
    this.getUser()
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      data => this.profile = data,
      error => console.error(error)
    );
  }

  getUser() {
    this.profileService.getUser().subscribe(
      data => this.profile = data,
      error => console.error(error)
    );
  }

  async toUpdateDetails() {
    let navigationExtras: NavigationExtras = {
      state: {
        isUpdate: true
      }
    };
    this.router.navigate(['/profileinfo'], navigationExtras);
  }

}
