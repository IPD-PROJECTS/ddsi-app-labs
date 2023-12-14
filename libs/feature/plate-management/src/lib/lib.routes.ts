import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const plateManagementRoutes: Route[] = [
  {
    path: '', pathMatch: 'full',  data: { breadcrumb: 'Dashboard' } , component: DashboardComponent
  },
  {
    path: 'list-plate-type', data: { breadcrumb: 'List Plate Type' } , loadComponent:() => import('../lib/plate-type-list/plate-type-list.component').then(c => c.PlateTypeListComponent)
  },
  {
    path: 'create-plate-type', data: { breadcrumb: 'Create Plate Type' } , loadComponent:() => import('../lib/plate-type-add/plate-type-add.component').then(c => c.PlateTypeAddComponent)
  },
  {
    path: 'plate-plan', data: { breadcrumb: 'Plate Plan' } , loadChildren:() => import('@ddsi-labs-apps/plate-plan-management').then(c => c.PlatePlanManagementModule)
  },
  {
    path: 'patients', data: { breadcrumb: 'Patients' } , loadChildren: () => import('@ddsi-labs-apps/patients-management').then(m => m.PatientsManagementModule)
  }
];
