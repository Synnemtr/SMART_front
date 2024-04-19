import { Routes } from '@angular/router';
import { IsAuthenticatedGuardGuard } from './authentication/guards/is-authenticated-guard.guard';
import { AlreadyAuthenticatedGuardGuard } from './authentication/guards/already-authenticated-guard.guard';
import { IsAdminGuardGuard } from './authentication/guards/is-admin-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage),
    canActivate: [AlreadyAuthenticatedGuardGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage),
    canActivate: [IsAdminGuardGuard]
  },
  {
    path: 'gq',
    loadComponent: () => import('./user/gq/gq.page').then( m => m.GqPage),
    canActivate: [IsAuthenticatedGuardGuard]
  },
  {
    path: 'mq',
    loadComponent: () => import('./user/mq/mq.page').then( m => m.MqPage),
    canActivate: [IsAuthenticatedGuardGuard]
  },
  {
    path: 'profileinfo', 
    loadComponent: () => import('./user/profileinfo/profileinfo.page').then( m => m.ProfileInfoPage),
    canActivate: [IsAuthenticatedGuardGuard]
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage),
    canActivate: [IsAuthenticatedGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'progress',
        loadComponent: () => import('./progress/progress/progress.page').then( m => m.ProgressPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./user/profile/profile.page').then( m => m.ProfilePage), 
      },
    ]
  },
  {
    path: 'personal-data',
    loadComponent: () => import('./user/personal-data/personal-data.page').then( m => m.PersonalDataPage),
    canActivate: [IsAuthenticatedGuardGuard]
  },
  {
    path: 'achievements',
    loadComponent: () => import('./progress/achievements/achievements.page').then( m => m.AchievementPage),
    canActivate: [IsAuthenticatedGuardGuard]
  },
  {
    path: 'badges', 
    loadComponent: () => import('./progress/badges/badges.page').then( m => m.BadgePage),
    canActivate: [IsAuthenticatedGuardGuard]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];