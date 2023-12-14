import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', data: { breadcrumb: 'Dashboard' } , component: DashboardComponent
  },
  {
    path: 'list-plate-type', data: { breadcrumb: 'List Plate Type' } , loadComponent:() => import('./pages/list-plate-type/list-plate-type.component').then(c => c.ListPlateTypeComponent)
  },
  {
    path: 'create-plate-type', data: { breadcrumb: 'Create Plate Type' } , loadComponent:() => import('./pages/create-plate-type/create-plate-type.component').then(c => c.CreatePlateTypeComponent)
  },
  {
    path: 'plate-plan', data: { breadcrumb: 'Plate Plan' } , loadChildren:() => import('./../plate-plan-management/plate-plan-management.module').then(c => c.PlatePlanManagementModule)
  },
  {
    path: 'patients', data: { breadcrumb: 'Patients' } , loadChildren: () => import('@ddsi-labs-apps/patients-management').then(m => m.PatientsManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateManagementRoutingModule { }
