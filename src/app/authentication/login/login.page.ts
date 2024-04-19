import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  constructor(public modalController: ModalController,
    private formBuilder: FormBuilder,
    private service:LoginService,
    private router: Router,
    private alertController: AlertController,
    private profileService: ProfileService,
  ) { }
  
  loginForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  async login() {
    let loginData: any = new FormData();
    Object.keys(this.loginForm.controls).forEach(formControlName => {
      loginData.append(formControlName,
      this.loginForm.get(formControlName)!.value);    
    });
    this.service.login(loginData).subscribe({
      next: (r:any) => {
        localStorage.setItem("token", r.token);
        localStorage.setItem("username", r.username);
        localStorage.setItem("id", r.user_id);
        localStorage.setItem("is_admin", r.is_admin);
      },
      error: (e) => this.loginFailed(e),
      complete: () => {
        this.dismiss()
        
        this.profileService.getProfile().subscribe({
          next: (r)=> {console.log(r)},
          error: (e) => console.log(console.error()),
          complete: () => {
            (this as any).router.navigateByUrl("/")
          }
        })
      }
    });
  }

  async loginFailed(error: any) {
    const alert = await this.alertController.create({
      header: "Connection Error",
      subHeader: "",
      message: "The connection failed. Please try again !",
      buttons: ['Close'],
    });

    await alert.present();
  }

  async dismiss() {
    await this.modalController.dismiss()
  }
}
