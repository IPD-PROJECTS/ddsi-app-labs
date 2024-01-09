import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
    {
        path: 'login', loadChildren: () => import('@ddsi-labs-apps/auth').then(c => c.AuthModule)
    },
    {
        path: 'apps', component: LayoutComponent, children: [
            {
                path: '', redirectTo: 'plates', pathMatch: 'full'
            },
            {
                path: 'plates', data: { breadcrumb: 'Plaques' } , loadChildren: () => import('@ddsi-labs-apps/plate-management').then(m => m.PlateManagementModule)
            }
        ]
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
];
