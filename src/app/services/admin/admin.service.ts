import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(
    private httpClient: HttpClient, 
    private isAuthenticated: LoginService,
    ) { }

  private headers = new HttpHeaders()
  private allUsersAPI = environment.backendUrl + "/users"
  private allGameProfilesAPI = environment.backendUrl + "/gamification-profiles/profiles"


  getAllUsers() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.allUsersAPI + "/", {headers: this.headers});
  }

  getAllGameProfiles() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.allGameProfilesAPI + "/", {headers: this.headers});
  }
  
}