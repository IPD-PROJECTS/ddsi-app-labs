import { Route } from '@angular/router';

export const authRoutes: Route[] = [

  {
    path: '', pathMatch: 'full', loadComponent: () => import('../lib/login/login.component').then(c => c.LoginComponent)
  }
];
