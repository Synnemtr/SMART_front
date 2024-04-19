import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { MqService } from '../../services/questionnaires/mq.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mq',
  templateUrl: './mq.page.html',
  styleUrls: ['./mq.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class MqPage {
  currentQuestionIndex: number = 0;
  selectedAnswer: number | null = null;
  answers: (number | null)[] = [];
  questions: any[] = []

  constructor(
    private changeDetector: ChangeDetectorRef,
    public router: Router,
    private http: HttpClient,
    private service: MqService,
    public modalController: ModalController,
    ) {
      this.fetchQuestions();
     } 
 
  // URL of the API to fetch questions
  private apiUrl = 'http://localhost:8000/api/v1/motivation-questions/';
  
  // Possible response choices for the questions
  RESPONSE_CHOICES = [['Strong disagree', '1'], ['Disagree', '2'], ['Somewhat disagree', '3'], ['Neither', '4'], ['Somewhat agree', '5'], ['Agree', '6'], ['Strongly agree', '7']];

  // Fetches questions from the API
  fetchQuestions() {
    for (let i = 1; i <= 24; i++) {
      this.http.get<any>(`${this.apiUrl}${i}/`).subscribe(question => {
        question.RESPONSE_CHOICES = this.RESPONSE_CHOICES;
        this.questions.push(question);
        this.answers.push(null);
      });
    }
  }

  // Updates the selected answer when an answer is selected
  onAnswerSelected(selectedAnswer: number) {
    this.selectedAnswer = selectedAnswer;
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // Returns true if the current question is the last question, false otherwise
  get isLastQuestion(): boolean {
    const lastQuestionIndex = this.questions.length - 1;
    return this.currentQuestionIndex === lastQuestionIndex;
  }

  async onNext() {
    // checks is user should be able to go to the next question
    if (this.isLastQuestion || this.selectedAnswer === undefined || this.selectedAnswer === null) {
      return;
    }
    
    // sets the answer for the given question
    this.answers[this.currentQuestionIndex] = this.selectedAnswer;

    this.currentQuestionIndex++;
    this.selectedAnswer = null;  
    this.changeDetector.markForCheck();
  }

  onPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      // sets the answer for the given question
      this.selectedAnswer = this.answers[this.currentQuestionIndex];
    }
  }

  async dismiss() {
    await this.modalController.dismiss()
  }

  async onSubmit() {
    // sets the answer for the given question
    this.answers[this.currentQuestionIndex] = this.selectedAnswer;
    
    // checks if user should be able to submit
    if (!this.isLastQuestion || this.answers[this.answers.length - 1] === undefined || this.answers[this.answers.length - 1] === null) {
      return;
    }
  
    // Prepare the data
    const data = { data: this.answers.map((score, index) => ({ question_id: index + 1, score })) };

    // Send the data to the API
    this.service.answerMotivationQuestionnaire(data).subscribe({
      next: () => this.router.navigate(['/ ']),
    });
  }
}
