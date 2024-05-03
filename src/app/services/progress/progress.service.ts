import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { ActionSheetController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class ProgressService {

  constructor(
    private httpClient: HttpClient, 
    private isAuthenticated: LoginService, 
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,) { }

  private headers = new HttpHeaders()

  private recommendedElements = environment.backendUrl + "/recommender-system"
  private rankedFood = environment.backendUrl + "/foods/ranking/food-by-users"

  private ratingElementAPI = environment.backendUrl + "/recommender-rating"
  private gameElementAPI = environment.backendUrl + "/game-element"
  private gameQuizAPI = environment.backendUrl + "/game-element-quiz"

  private achievementsAPI = environment.backendUrl + "/achievements"
  private userAchievementsAPI = environment.backendUrl + "/achievements/user"
  private rankingAchievementsAPI = environment.backendUrl + "/achievements/ranking"

  private activeAchievementsAPI = environment.backendUrl + "/achievements/active"

  private badgesAPI = environment.backendUrl + "/badges"
  private userBadgesAPI = environment.backendUrl + "/badges/earned"

  getRecommendedElements() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.recommendedElements + "/user/", {headers: this.headers});
  }

  getRankedFoods() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.rankedFood + "/", {headers: this.headers});
  }

  getGameElements() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.gameElementAPI + "/", {headers: this.headers});
  }

  getActiveAchievements() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.activeAchievementsAPI + "/", {headers: this.headers});
  }

  postActiveAchievement(data: any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.activeAchievementsAPI + "/user/", data, {headers: this.headers});
  }

  putActiveAchievement(id: number, data: any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.put(this.activeAchievementsAPI + "/user/" + id + "/", data, {headers: this.headers});
  }

  deleteActiveAchievement(id: number) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.delete(this.activeAchievementsAPI + "/user/" + id + "/", {headers: this.headers});
  }

  getAchievements() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.achievementsAPI + "/", {headers: this.headers});
  }

  getAchievementsById(id:number) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.achievementsAPI + "/" + id + "/", {headers: this.headers});
  }

  getUserAchievements() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.userAchievementsAPI + "/", {headers: this.headers});
  }

  newUserAchievement(data:any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.achievementsAPI + "/list/user/", data, {headers: this.headers});
  }

  getRankingAchievements() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.rankingAchievementsAPI + "/", {headers: this.headers});
  }

  getBadges() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.badgesAPI + "/", {headers: this.headers});
  }

  getBadgeById(id:number) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.badgesAPI + "/" + id +"/", {headers: this.headers});
  }

  getUserBadges() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.userBadgesAPI + "/", {headers: this.headers});
  }

  newUserBadge(data:any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.badgesAPI + "/user/", data, {headers: this.headers});
  }

  getGameQuiz() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.gameQuizAPI + "/", {headers: this.headers});
  }

  getRecommenderRating() {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.get(this.ratingElementAPI + "/", {headers: this.headers});
  }

  postRecommenderRating(data: any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.ratingElementAPI + "/", data, {headers: this.headers});
  }

  private userFoodIntakeAPI = environment.backendUrl + "/foods/food-intake"
  newUserFoodIntake(data:any) {
    this.headers = this.headers.set("Authorization", "Token "+this.isAuthenticated.getToken())
    return this.httpClient.post(this.userFoodIntakeAPI + "/", data, {headers: this.headers});
  }

  async inputFoodQuantity(id: number) {
    const alert = await this.alertController.create({
      header: 'Enter Quantity',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Enter quantity'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.addToEatingJournal(id, data.quantity);
          }
        }
      ]
    });
    await alert.present();
  }

  async addMeal(id: number) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Add to Eating Journal',
        handler: () => {
          this.inputFoodQuantity(id);
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  addToEatingJournal(id: number, quantity: number) {
    this.newUserFoodIntake({food: id, quantity: quantity}).subscribe();
  }

}