import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../authentication/login/login.page';
import { RegistrationPage } from '../authentication/registration/registration.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WelcomePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      animated: true,
      mode: "ios",
      backdropDismiss: false,
      cssClass: "login-modal",
    })

    return await modal.present();
  }

  async registration() {
    const modal = await this.modalController.create({
      component: RegistrationPage,
      animated: true,
      mode: "ios",
      backdropDismiss: false,
      cssClass: "login-modal",
    })

    return await modal.present();
  }
}
