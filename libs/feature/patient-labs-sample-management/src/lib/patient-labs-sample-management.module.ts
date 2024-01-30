import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { patientLabsSampleManagementRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(patientLabsSampleManagementRoutes),
  ],
})
export class PatientLabsSampleManagementModule {}
