import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authenticatedGuard } from '@ddsi-labs-apps/services';

export const appRoutes: Route[] = [
    {
        path: 'login', loadChildren: () => import('@ddsi-labs-apps/auth').then(c => c.AuthModule),
        // canActivate:[canLoginGuard]
    },
    {
        path: 'apps', component: LayoutComponent, children: [
            {
                path: '', redirectTo: 'plates', pathMatch: 'full'
            },
            {
                path: 'plates', data: { breadcrumb: 'Plaques' } , loadChildren: () => import('@ddsi-labs-apps/plate-management').then(m => m.PlateManagementModule)
            }
        ],
        canActivate:[authenticatedGuard],
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
];
