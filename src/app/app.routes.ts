import { Routes, CanActivate } from '@angular/router';
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
    canActivate: [authGuard]
  },
  {
    path : 'products',
    loadComponent: () => import('./dashboard/pages/products/products.component').then(m => m.ProductsComponent),
  },
  {
    path : 'checkout',
    loadComponent: () => import('./dashboard/pages/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  },
  {
    path : 'user',
    loadComponent: () => import('./dashboard/pages/user/user.component').then(m => m.UserComponent),
    canActivate: [authGuard]
  }

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

  },
  {
    path: 'privacyPolicy',
    loadComponent: () => import('./dashboard/pages/privacyPolicy/privacyPolicy.component').then(m => m.PrivacyPolicyComponent),
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


