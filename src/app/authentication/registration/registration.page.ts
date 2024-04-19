import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistrationPage implements OnInit {

  constructor(
    public modalController: ModalController, 
    private formBuilder:FormBuilder, 
    private rService: RegistrationService, 
    private alertController: AlertController, 
    private router: Router, 
    private lService: LoginService) { }

  registrationForm: FormGroup = new FormGroup({})


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{12,}')]],
    })
  }

  async register() {
    let registrationData: any = new FormData();
    let username: string = this.registrationForm.get("username")!.value;
    let password: string = this.registrationForm.get("password")!.value;

    Object.keys(this.registrationForm.controls).forEach(formControlName => {
      registrationData.append(formControlName,
      this.registrationForm.get(formControlName)!.value);    
    });  

    this.rService.register(registrationData).subscribe({
      next: () => {
        let loginData: any = new FormData();
        loginData.append("username", username);
        loginData.append("password", password);
        this.lService.login(loginData).subscribe({
          next: (response:any) => {
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", response.username);
            localStorage.setItem("id", response.user_id);
            localStorage.setItem("is_admin", response.is_admin);

            this.router.navigate(['/profileinfo']);
          },
        });
      },
    error: (e) => this.registrationFailed(e.error), 
    complete: () => {
      this.dismiss();
    }
  });
  }

  async dismiss() {
    await this.modalController.dismiss()
  }

  async registrationFailed(error: any) {
    const alert = await this.alertController.create({
      header: "Connection Error",
      subHeader: "",
      message: "The registration failed. Please try again !",
      buttons: ['Close'],
    });

    await alert.present();
  }
}
