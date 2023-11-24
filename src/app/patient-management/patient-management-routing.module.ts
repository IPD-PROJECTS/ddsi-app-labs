import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientsComponent } from './pages/list-patients/list-patients.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPatientsComponent,
    data: { breadcrumb: 'List Patients' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientManagementRoutingModule { }
