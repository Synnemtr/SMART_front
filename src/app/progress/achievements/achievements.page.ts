import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProgressService } from 'src/app/services/progress/progress.service';


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class AchievementPage implements OnInit {
  rankingAchievements: any;
  userAchievements: any;
  allAchievements: any;
  activeAchievements: any;
  inputValue: number = 0;

  constructor(
    public modalController: ModalController, 
    private progressService: ProgressService,
  ) { }

  ngOnInit() {
    this.getRankingAchievements();
    this.getUserAchievements();
    this.getAllAchievements();
    this.getActiveAchievement();
  }

  getRankingAchievements() {
    this.progressService.getRankingAchievements().subscribe((data) => {
      this.rankingAchievements = data;
    });
  }

  getActiveAchievement() {
    this.progressService.getActiveAchievements().subscribe(
      data => {
        this.activeAchievements = data;
      },
      error => console.error(error)
    );
  }

 addActiveAchievement(achievement_id: number) {
    const data = {
        "achievement_id": achievement_id,
        "current_points": 0
    };
    this.progressService.postActiveAchievement(data).subscribe(() => {
        location.reload();
    }, 
    error => console.error(error));
  }

  removeActiveAchievement(id: any) {
    this.progressService.deleteActiveAchievement(id).subscribe(() => {
      this.getUserAchievements();
    }, 
    error => console.error(error));
  }

  updateAchievementProgress(achievement_id: any, progress: number) {
    const data = {
      "current_points": progress
    };
    this.progressService.putActiveAchievement(achievement_id, data).subscribe(() => {
      this.checkAchievementProgress(achievement_id);
      this.getUserAchievements();
    });
  }

  checkAchievementProgress(achievement: any) {
    const activeAchievement = this.activeAchievements.find((a: any) => a.achievement_id === achievement.achievement_id);
    const generalAchievement = this.allAchievements.find((a: any) => a.achievement_id === achievement.achievement_id);

    if (activeAchievement && generalAchievement && activeAchievement.current_points >= generalAchievement.threshold) {
      this.postUserAchievement(achievement.achievement_id);
      this.removeActiveAchievement(achievement.achievement_id);
      this.getUserAchievements();
    }
  }

  isActiveAchievement(id: number): boolean {
    return this.activeAchievements.some((achievement: any) => achievement.id === id);
  }

  getAllAchievements() {
    this.progressService.getAchievements().subscribe((data) => {
      this.allAchievements = data;
    });
  }

  getUserAchievements() {
    this.progressService.getUserAchievements().subscribe((data) => {
      this.userAchievements = data;
    });
  }

  postUserAchievement(achievement_id: any) {
    const data = {
      "achievement_id": achievement_id
    };
    this.progressService.newUserAchievement(data).subscribe(() => {
      this.getUserAchievements();
    });
  }

}
