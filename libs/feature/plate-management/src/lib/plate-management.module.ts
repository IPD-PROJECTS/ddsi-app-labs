import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { plateManagementRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(plateManagementRoutes)],
})
export class PlateManagementModule {}
