import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class MqService {

  constructor(private httpClient: HttpClient, private isAuthenticated: LoginService) { }

  private motivationAPI = environment.backendUrl + "/motivation-profiles/"
  private header = new HttpHeaders()

  answerMotivationQuestionnaire(data:any) {
    this.header = this.header.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.motivationAPI + "questions/", data, {headers: this.header});
  }

}
