import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  profiles: any; 
  updateProfileForm: FormGroup = new FormGroup({});
  currentSubgoalProgress: number = 0;
  lastThreeMeals: any[] = [];

  recommendedElements: any;
  recommendedElement: any;
  ratingElement: any; 
  rating: number = 0;
  isButtonClicked = false;
  gameElement: any; 
  gameElements: any; 
  quizData: any;
  currentQuestion: any;
  message: string = '';

  activeAchievements: any;
  rankingAchievements: any;
  rankedFoods: any; 
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
    private cdr: ChangeDetectorRef, 
    ) { }

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      goal_progress: [''],
      total_points: [''],
    });
    this.getUserAndProfile()
    this.getAllProfiles()
    this.getActiveAchievement()
    this.getUserBadges()
    this.getQuizData()
    this.getRankingAchievements();
    this.getRatingElement()

    this.getGameElements()
  }

  addMeal(id: number) {
    this.progressService.addMeal(id);
  }

  getRecommendedElement() {
    this.progressService.getRecommendedElements().subscribe(
      data => {
        this.recommendedElements = data;
        console.log("Recommended Elements: ", this.recommendedElements);
        this.setRecommendedElement();
      },
      error => console.error(error)
    );
  }

  setRecommendedElement() {
    if (this.recommendedElements && this.recommendedElements.length > 0) {
      this.recommendedElement = this.recommendedElements[0];
      if (this.gameElements && this.gameElements.length > 0) {
        this.gameElement = this.gameElements.find((element: any) => element.id === this.recommendedElement.id);
      }
      this.cdr.detectChanges();
    }
    console.log("Recommended Element: ", this.recommendedElement);
    console.log("Game Element: ", this.gameElement);
  }

  getRatingElement() {
    this.progressService.getRecommenderRating().subscribe(
      data => {
        this.ratingElement = data;
        console.log("Ranking Elements: ", this.ratingElement);
      },
      error => console.error(error)
    );
  }

  postRatingElement(user_id: number, game_element_id: number, rating: number) {
    const data = {
      "user_id": user_id,
      "game_element_id": game_element_id,
      "rating": rating
    };
    this.progressService.postRecommenderRating(data).subscribe(() => {
        location.reload();
    }, 
    error => console.error(error));
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
          location.reload();
        },
        error: (e) => {
          console.log(e.error);
          location.reload();
        },
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

  getAllProfiles() {
    this.profileService.getAllProfiles().subscribe(
      data => {
        this.profiles = data;
        this.profiles.sort((a: any, b: any) => b.total_points - a.total_points);
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
    let updatePointsData: any = new FormData();
    if (option === this.currentQuestion.correct_answer) {
      updatePointsData.append('total_points', '1');
      this.message = 'Correct!';
    } else {
      this.message = `Wrong answer. The correct answer is ${this.currentQuestion.correct_answer}.`;
    }

    this.profileService.getProfile().subscribe((currentProfileData: any) => {
      for (let pair of updatePointsData.entries()) {
        currentProfileData[pair[0]] = pair[1];
      }

      this.profileService.updateProfile(currentProfileData).subscribe({
        next: (response: any) => {
          console.log(response);
          location.reload();
        },
        error: (e) => {
          console.log(e.error);
          location.reload();
        },
      });
    });
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

  getRankingFoods() {
    this.progressService.getRankedFoods().subscribe((data) => {
      this.rankedFoods = data;
    });
  }

  getGameElements() {
    this.progressService.getGameElements().subscribe(
      data => {
        this.gameElements = data;
        console.log("Game Elements: ", this.gameElements);
        this.getRecommendedElement()
      },
      error => console.error(error)
    );
  }

  gameElementPlacer() {
    // TODO: implement the algorithm
  }

}
