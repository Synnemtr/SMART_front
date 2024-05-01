import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProgressService } from 'src/app/services/progress/progress.service';


@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class BadgePage implements OnInit {
  userBadges: any;
  allBadges: any;

  constructor(
    public modalController: ModalController, 
    private progressService: ProgressService,
  ) { }

  ngOnInit() {
    this.getUserBadges();
    this.getAllBadges();
  }

  getAllBadges() {
    this.progressService.getBadges().subscribe((data) => {
      this.allBadges = data;
    });
  }

  getUserBadges() {
    this.progressService.getUserBadges().subscribe((data) => {
      this.userBadges = data;
    });
  }

  postUserBadge(badge_id: number) {
    const data = {
      "badge_id": badge_id
    };
    this.progressService.newUserBadge(data).subscribe(() => {
      location.reload();
    });
  }

}
