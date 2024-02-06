import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { platePlanManagementRoutes } from './lib.routes';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService, PlatePlanService } from '@ddsi-labs-apps/services';
import { PlateDetailResolve } from './plate-details.resolver';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(platePlanManagementRoutes)],
  providers:[MessageService, PlateDetailResolve, DialogService, PlatePlanService, NotificationService]
})
export class PlatePlanManagementModule {}
