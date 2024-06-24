import { Route } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsDashboardComponent } from './patients-dashboard/patients-dashboard.component';

export const patientsManagementRoutes: Route[] = [
  {
    path: 'list',
    component: PatientsListComponent,
    data: { breadcrumb: 'Liste des Patients' }
  },
  {
    path: 'dashboard',
    component: PatientsDashboardComponent,
    data: { breadcrumb: "Dashboard de l'espace Patients" }
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  }
];
