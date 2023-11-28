import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlatePlanComponent } from './pages/list-plate/list-plate-plan.component';

const routes: Routes = [
  {
    path: 'list',
    data: { breadcrumb: 'List'},
    component: ListPlatePlanComponent
  },
  {
    path: 'create',
    data: { breadcrumb: 'Create'},
    loadComponent: () => import('./pages/create-plate-plan/create-plate-plan.component').then(c => c.CreatePlatePlanComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatePlanManagementRoutingModule { }
