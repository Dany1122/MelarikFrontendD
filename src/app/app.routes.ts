import { Routes } from '@angular/router';

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
  path: 'home',
  loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  children: dashboardRoutes,
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


