import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AdminService } from '../services/admin/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class AdminPage implements OnInit {
  allUsers: any; 
  allGameProfiles: { [key: string]: { gamification_type_id: number, score: number }[] } = {};

  constructor(
    public modalController: ModalController, 
    private adminService: AdminService,
    ) { }

  ngOnInit() {
    this.getAllUsers()
    this.getAllGameProfiles()
  }

  getAllUsers() { 
    this.adminService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
    });
  }

  getAllGameProfiles() {
    this.adminService.getAllGameProfiles().subscribe((data: any) => { 
      this.allGameProfiles = data.reduce((acc: {[key: string]: any}, curr: any) => {
        if (!acc[curr.profile_id]) {
          acc[curr.profile_id] = {};
        }
        acc[curr.profile_id][curr.gamification_type_id] = curr.score;
        return acc;
      }, {});
    })
  }

}
