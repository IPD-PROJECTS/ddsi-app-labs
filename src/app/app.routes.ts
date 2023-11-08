import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
    {
        path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '', redirectTo: 'plates', pathMatch: 'full'
            },
            {
                path: 'plates', data: { breadcrumb: 'Plates' } , loadChildren: () => import('./plate-management/plate-management.module').then(m => m.PlateManagementModule)
            }
        ]
    }
];
