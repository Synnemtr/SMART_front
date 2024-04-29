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
  userProfiles: any = {};

  constructor(
    public modalController: ModalController, 
    private adminService: AdminService,
    ) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() { 
    this.adminService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      for(let user of this.allUsers) {
        this.getUserProfile(user.id);
      }
    });
  }

  getUserProfile(id: number){
    this.adminService.getUserProfile(id).subscribe((data) => {
      this.userProfiles[id] = data;
    });
  }
}
