import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { platePlanManagementRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(platePlanManagementRoutes)],
})
export class PlatePlanManagementModule {}
