import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  timer: any;
  private loginAPI = environment.backendUrl + "/auth/login/";
  
  constructor(private httpClient: HttpClient, private router: Router, private alertController: AlertController) { }

  login(credentials:any) {
    return this.httpClient.post(this.loginAPI, credentials);
  }

  isLoggedIn() {
    if (localStorage.getItem("token") === null) {
      localStorage.clear()
      return false
    }
    return true;
  }

  isAdmin() {
    if (localStorage.getItem("is_admin") === "true") {
      console.log("Logged in with admin privileges");
      return true;
    }
    return false;
  }

  getToken() {
    if (this.isLoggedIn()) {
      return localStorage.getItem("token");
    } else {
      return null
    }
  }

  getId() {
    return localStorage.getItem("id");
  }

  // temporary logout-function, only logging user out from frontend
  async logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome']);
  }
}
