import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  constructor(private httpClient: HttpClient, private isAuthenticated: LoginService) { }

  private headers = new HttpHeaders()
  private registrationAPI = environment.backendUrl + "/users"
  private profileInfoAPI = environment.backendUrl + "/users/profile"

  register(registrationForm:any) {
    return this.httpClient.post(this.registrationAPI + "/add/", registrationForm)
  }

  registerProfileInfo(profileInfoForm: any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.profileInfoAPI + "/add/", profileInfoForm, {headers: this.headers});
  }
}
