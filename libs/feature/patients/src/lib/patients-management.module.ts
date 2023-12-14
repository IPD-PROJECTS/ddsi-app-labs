import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { patientsManagementRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(patientsManagementRoutes)],
})
export class PatientsManagementModule {}
