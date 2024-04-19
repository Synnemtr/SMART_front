import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root',
})
export class GqService {

  constructor(private httpClient: HttpClient, private isAuthenticated: LoginService) { }

  private gamificationAPI = environment.backendUrl + "/gamification-profiles";
  private header = new HttpHeaders();

  answerGamificationQuestionnaire(data:any) {
    this.header = this.header.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.gamificationAPI + "/questions/", data, {headers: this.header});
  }

  playertype() {
    return this.httpClient.get(this.gamificationAPI + "/profiles/", {headers: this.header})
  }

}
