import { Route } from '@angular/router';
import { PlateDetailResolve } from './plate-details.resolver';
import { PlateListComponent } from './plate-list/plate-list.component';

export const platePlanManagementRoutes: Route[] = [
  {
    path: 'list',
    data: { breadcrumb: 'List' },
    component: PlateListComponent,
  },
  {
    path: 'create',
    data: { breadcrumb: 'Create' },
    loadComponent: () =>
      import('../lib/plate-plan-settings/plate-plan-settings.component').then(
        (c) => c.PlatePlanSettingsComponent
      ),
  },
  {
    path: 'edit/:id',
    data: { breadcrumb: 'Edit' },
    resolve: {
      plateDetails: PlateDetailResolve
    },
    loadComponent: () =>
      import('../lib/plate-plan-settings/plate-plan-settings.component').then(
        (c) => c.PlatePlanSettingsComponent
      ),
  },
];
