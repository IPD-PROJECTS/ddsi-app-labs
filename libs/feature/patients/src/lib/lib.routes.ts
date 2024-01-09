import { Route } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';

export const patientsManagementRoutes: Route[] = [
  {
    path: 'list',
    component: PatientsListComponent,
    data: { breadcrumb: 'Liste de Patients' }
  },
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  }
];
