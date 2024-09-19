import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { loginGuard } from './guard/login.guard';

const dashboardRoutes: Routes = [
  {
  path: '',
  loadComponent: () => import('./dashboard/pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path : 'history',
    loadComponent: () => import('./dashboard/pages/history/history.component').then(m => m.HistoryComponent),
  },

];


export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('../../public/login/login.component').then(m => m.LoginComponent),
    canMatch: [loginGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: dashboardRoutes,
    canActivate: [authGuard],
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'home',
  }
];


