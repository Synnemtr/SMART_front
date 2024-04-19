import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile/profile.service';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ProgressPage implements OnInit {
  user: any;
  profile: any;
  currentSubgoalProgress: number = 0;
  lastThreeMeals: any[] = [];


  fitnessGoalChoices = [
    { label: 'Lose Weight', value: 1 },
    { label: 'Build Muscle', value: 2 },
    { label: 'Improve Endurance', value: 3 },
    { label: 'Get Stronger', value: 4 },
    { label: 'Stay Fit and Healthy', value: 5 },
    { label: 'Other', value: 6 }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController, 
    private profileService: ProfileService,
    ) { }

  ngOnInit() {
    this.getUserAndProfile()
  }

  getGoalLabel(goalValue: number): string {
    const goal = this.fitnessGoalChoices.find(choice => choice.value === goalValue);
    return goal ? goal.label : '';
  }

  getUserAndProfile() {
    this.profileService.getUser().subscribe(
      data => this.user = data,
      error => console.error(error)
    );
    this.profileService.getProfile().subscribe(
      data => {
        this.profile = data;
      },
      error => console.error(error)
    );
  }

  progressbarSubgoal(subGoal: string): number {
    const result = subGoal.match(/\d+/);
    return result ? parseInt(result[0], 10) : 0;
  }
  // To update the currentSubgoalProgress filed later
  updateSubgoalProgress(newProgress: number): void {
    this.currentSubgoalProgress = newProgress;
  } 

  async toAchievements() {
    this.router.navigate(['achievements']);
  }

  async toBadges() {
    this.router.navigate(['badges']);
  }

  gameElementPlacer() {
    // function to place game element into the placeholders
  }

}
