import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabsSampleManagementComponent } from './labs-sample-management/labs-sample-management.component';
import { RegisterLabSampleComponent } from './register-lab-sample/register-lab-sample.component';

export const patientLabsSampleManagementRoutes: Route[] = [
  {
    path: '',
    data: { breadcrumb: 'Dashboard' },
    component: DashboardComponent
  },
  {
    path: 'list',
    data: { breadcrumb: 'Liste des échantillons' },
    component: LabsSampleManagementComponent,
  },
  {
    path: 'create',
    data: { breadcrumb: 'Formulaire de reception' },
    component: RegisterLabSampleComponent,
  },
];
