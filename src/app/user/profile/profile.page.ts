import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { ProfileService } from '../../services/profile/profile.service';
import { LoginService } from '../../services/login/login.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class ProfilePage implements OnInit {
  user: any;
  isAdmin: boolean = false;
  profile: any;
  gq_type: any;

  constructor(
    private profileService: ProfileService,
    public router: Router,
    private loginService: LoginService,
    ) { }

  ngOnInit() {
    this.getUser();
    this.getProfile();
    this.isAdmin = this.loginService.isAdmin();

  }

  getUser() {
    this.profileService.getUser().subscribe(
      data => this.user = data,
      error => console.error(error)
    );
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      data => this.profile = data,
      error => console.error(error)
    );
  }

  async toPersonalDetails() {
    this.router.navigate(['/personal-data']);
  }

  // temporary function to redirect to admin (backend) page
  async toAdminPage() {
    if (this.loginService.isAdmin()) {
      window.location.href = 'http://localhost:8000/admin/';
    } else {
      console.log("You are not an admin");
    }
  }

  async logout() {
    this.loginService.logout();
  }
}
