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
  // TODO: Make this permanent, mabye store it in the backend?
  activeAchievements: { [achievement: string]: [number, number] } = {};

  constructor(
    public modalController: ModalController, 
    private progressService: ProgressService,
  ) { }

  ngOnInit() {
    this.getRankingAchievements();
    this.getUserAchievements();
    this.getAllAchievements();
  }

  getRankingAchievements() {
    this.progressService.getRankingAchievements().subscribe((data) => {
      this.rankingAchievements = data;
    });
  }

  addActiveAchievement(achievement: any, achievementDescription: string) {
    const goal = achievementDescription.match(/\d+/);
    const progressGoal = goal ? parseInt(goal[0], 10) : 0;
    if (!(achievement in this.activeAchievements)) {
      this.activeAchievements[achievement] = [0, progressGoal];
    }
  }

  removeActiveAchievement(achievement: any) {
    if (achievement in this.activeAchievements) {
      delete this.activeAchievements[achievement];
    }
  }

  updateAchievementProgress(achievement: any, progress: number) {
    if (achievement in this.activeAchievements) {
      this.activeAchievements[achievement][0] = progress;
    }
  }

  checkAchievementProgress(achievement: any) {
    if (this.activeAchievements[achievement][0] >= this.activeAchievements[achievement][1]) { 
      this.progressService.newUserAchievement(achievement.id);
      this.userAchievements.push(achievement);
      delete this.activeAchievements[achievement];
    }
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

}
