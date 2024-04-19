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
  // TODO: Make this permanent, mabye store it in the backend?
  activeBadges: { [badge: string]: [number, number] } = {};

  constructor(
    public modalController: ModalController, 
    private progressService: ProgressService,
  ) { }

  ngOnInit() {
    this.getUserBadges();
    this.getAllBadges();
  }

  addActiveBadge(badge: any, badgeDescription: string) {
    const goal = badgeDescription.match(/\d+/);
    const progressGoal = goal ? parseInt(goal[0], 10) : 0;
    if (!(badge in this.activeBadges)) {
      this.activeBadges[badge] = [0, progressGoal];
    }
  }

  removeActiveBadge(badge: any) {
    if (badge in this.activeBadges) {
      delete this.activeBadges[badge];
    }
  }

  updateBadgeProgress(badge: any, progress: number) {
    if (badge in this.activeBadges) {
      this.activeBadges[badge][0] = progress;
    }
  }

  checkBadgeProgress(badge: any) {
    if (this.activeBadges[badge][0] >= this.activeBadges[badge][1]) { 
      this.progressService.newUserBadge(badge.id);
      this.userBadges.push(badge);
      delete this.activeBadges[badge];
    }
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

}
