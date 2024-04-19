import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private isAuthenticated: LoginService) { }

  private userAPI = environment.backendUrl + "/users"
  private profileAPI = environment.backendUrl + "/users/profile"
  private headers = new HttpHeaders()

  getUser() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.userAPI + "/" + localStorage.getItem("id") + "/", {headers: this.headers});
  }

  getProfile() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.profileAPI + "/" + localStorage.getItem("id") + "/", {headers: this.headers});
  }

  updateProfile(updateInfoForm: any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.put(this.profileAPI + "/" + localStorage.getItem("id") + "/", updateInfoForm, {headers: this.headers});
  }

  deleteProfile() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.delete(this.userAPI + "/" + localStorage.getItem("id") + "/", {headers: this.headers});
  }

  checkProfileValidity(profileData: any) {

  }

  defineGamificationProfiel(hexad12Results: any) {
    
  }
  
}