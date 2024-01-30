import { Route } from '@angular/router';
import { PatientsLabsSampleListComponent } from './patients-labs-sample-list/patients-labs-sample-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const patientLabsSampleManagementRoutes: Route[] = [
  {
    path: '',
    data: { breadcrumb: 'Dashboard' },
    component: DashboardComponent
  },
  {
    path: 'list',
    data: { breadcrumb: 'Liste des patients avec les détails des échantillons' },
    component: PatientsLabsSampleListComponent,
  },
];
