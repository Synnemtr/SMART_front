import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ProgressService } from 'src/app/services/progress/progress.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class ProgressPage implements OnInit {
  user: any;
  profile: any;
  updateProfileForm: FormGroup = new FormGroup({});
  currentSubgoalProgress: number = 0;
  lastThreeMeals: any[] = [];

  gameElements: any; 
  quizData: any;
  currentQuestion: any;
  score: number = 0; // TODO: store this in backend
  message: string = '';

  activeAchievements: any;
  rankingAchievements: any;
  userBadges: any;

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
    public modalController: ModalController, 
    private profileService: ProfileService,
    private progressService: ProgressService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      goal_progress: [''],
    });
    this.getUserAndProfile()
    this.getActiveAchievement()
    this.getUserBadges()
    this.getQuizData()
    this.getRankingAchievements();
    this.getGameElements()
  }

  getGoalLabel(goalValue: number): string {
    const goal = this.fitnessGoalChoices.find(choice => choice.value === goalValue);
    return goal ? goal.label : '';
  }

  updateGoal() {
  if (this.updateProfileForm.valid) {
    let updateGoalData: any = new FormData();
    const control = this.updateProfileForm.get('goal_progress');
    if (control && control.value && control.value !== '') {
      updateGoalData.append('goal_progress', control.value);
    }

    this.profileService.getProfile().subscribe((currentProfileData: any) => {
      for (let pair of updateGoalData.entries()) {
        currentProfileData[pair[0]] = pair[1];
      }

      this.profileService.updateProfile(currentProfileData).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (e) => console.log(e.error),
        });
      });
    }
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

  positiveFeedback() {

  }

  getActiveAchievement() {
    this.progressService.getActiveAchievements().subscribe(
      data => {
        this.activeAchievements = data;
      },
      error => console.error(error)
    );
  }

  async toAchievements() {
    this.router.navigate(['achievements']);
  }

  getUserBadges() {
    this.progressService.getUserBadges().subscribe((data) => {
      this.userBadges = data;
    });
  }

  async toBadges() {
    this.router.navigate(['badges']);
  }

  getQuizData() {
    this.progressService.getGameQuiz().subscribe(
      data => {
        this.quizData = data;
      },
      error => console.error(error)
    );
  }

  getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.quizData.length);
    this.currentQuestion = this.quizData[randomIndex];
  }

  handleAnswer(option: string) {
    if (option === this.currentQuestion.correct_answer) {
      this.score++;
      this.message = 'Correct!';
    } else {
      this.message = `Wrong answer. The correct answer is ${this.currentQuestion.correct_answer}.`;
    }
  }

  startQuiz() {
    this.getRandomQuestion();
    const fiveMinutes = 5 * 60 * 1000; // 5 min
    interval(fiveMinutes).pipe(take(1)).subscribe(() => this.getRandomQuestion());
  }

  getRankingAchievements() {
    this.progressService.getRankingAchievements().subscribe((data) => {
      this.rankingAchievements = data;
    });
  }

  getGameElements() {
    this.progressService.getGameElements().subscribe(
      data => {
        this.gameElements = data;
        console.log("Game Elements: ", this.gameElements);
      },
      error => console.error(error)
    );
  }

  gameElementPlacer() {
    // TODO: implement the algorithm
  }

}
