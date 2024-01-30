import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authenticatedGuard, canLoginGuard } from '@ddsi-labs-apps/services';

export const appRoutes: Route[] = [
    // {
    //     path: 'login', loadChildren: () => import('@ddsi-labs-apps/auth').then(c => c.AuthModule),
    //     canActivate:[canLoginGuard]
    // },
    {
        path: 'apps', component: LayoutComponent, children: [
            {
                path: '', redirectTo: 'plates', pathMatch: 'full'
            },
            {
                path: 'plates', data: { breadcrumb: 'Plaques' } , loadChildren: () => import('@ddsi-labs-apps/plate-management').then(m => m.PlateManagementModule)
            },
            {
                path: 'labs-samples', data: {breadcrumb: 'Echantillons'}, loadChildren: () => import('@ddsi-labs-apps/patient-labs-sample-management').then(m => m.PatientLabsSampleManagementModule)
            }
        ],
        canActivate:[authenticatedGuard],
    },
    {
        path: '', pathMatch: 'full', loadChildren: () => import('@ddsi-labs-apps/auth').then(c => c.AuthModule),
        canActivate:[canLoginGuard]
    },
    {
        path: '**', redirectTo: ''
    }
];
